'use client';

import {addDoc, collection, doc, onSnapshot, query, setDoc, where} from 'firebase/firestore';
import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';

import {useGetProfileInfo} from '@/hooks';
import {db} from '@/lib/firebase';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';

// Tạo AudioContext toàn cục để tránh vấn đề với nhiều context
let globalAudioContext: AudioContext | null = null;
try {
    // Khởi tạo AudioContext toàn cục
    globalAudioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    console.log('Global AudioContext created successfully');
} catch (e) {
    console.error('Failed to create AudioContext:', e);
}

interface WebRTCContextType {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    isCalling: boolean;
    isReceivingCall: boolean;
    currentCallId: string | null;
    currentCallTargetId: string | null;
    currentCallTargetType: MESSAGE_TARGET_TYPE | null;
    startCall: (targetId: string, targetType: MESSAGE_TARGET_TYPE) => Promise<void>;
    answerCall: () => Promise<void>;
    endCall: () => void;
    rejectCall: () => void;
}

const WebRTCContext = createContext<WebRTCContextType | null>(null);

export const WebRTCProvider = ({children}: {children: ReactNode}) => {
    const {userId} = useGetProfileInfo();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [isReceivingCall, setIsReceivingCall] = useState(false);
    const [currentCallId, setCurrentCallId] = useState<string | null>(null); // The document ID in firestore
    const [currentCallTargetId, setCurrentCallTargetId] = useState<string | null>(null); // The user ID of the caller or receiver
    const [currentCallTargetType, setCurrentCallTargetType] = useState<MESSAGE_TARGET_TYPE | null>(null);

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const callDocRef = useRef<string | null>(null);

    // End the call
    const endCall = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                console.log(`Stopping local track: ${track.kind}`);
                track.stop();
            });
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            console.log('Peer connection closed');
            peerConnectionRef.current = null;
        }

        if (callDocRef.current) {
            setDoc(doc(db, 'calls', callDocRef.current), {status: 'ended'}, {merge: true}).catch(console.error);
            callDocRef.current = null;
        }

        setLocalStream(null);
        setRemoteStream(null);
        setIsCalling(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [localStream]);

    const rejectCall = useCallback(() => {
        if (currentCallId) {
            setDoc(doc(db, 'calls', currentCallId), {status: 'rejected'}, {merge: true}).catch(console.error);
        }

        setIsReceivingCall(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [currentCallId]);

    const createPeerConnection = useCallback(() => {
        const configuration: RTCConfiguration = {
            iceServers: [
                {urls: 'stun:stun.l.google.com:19302'},
                {urls: 'stun:stun1.l.google.com:19302'},
                {urls: 'stun:stun2.l.google.com:19302'},
            ],
        };

        console.log('Creating peer connection with config:', configuration);
        const pc = new RTCPeerConnection(configuration);

        // Tạo kênh dữ liệu để kiểm tra kết nối
        try {
            const dataChannel = pc.createDataChannel('audioTestChannel');
            
            dataChannel.onopen = () => {
                console.log('Kênh dữ liệu kiểm tra âm thanh đã mở');
                
                // Gửi tín hiệu kiểm tra âm thanh mỗi 2 giây
                const audioCheckInterval = setInterval(() => {
                    if (dataChannel.readyState === 'open') {
                        dataChannel.send(JSON.stringify({
                            type: 'audioCheck',
                            timestamp: Date.now()
                        }));
                    } else {
                        clearInterval(audioCheckInterval);
                    }
                }, 2000);
            };
            
            dataChannel.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'audioCheck') {
                        console.log('Nhận được tín hiệu kiểm tra âm thanh từ đối phương');
                    }
                } catch (e) {
                    console.error('Lỗi khi xử lý tin nhắn từ kênh dữ liệu:', e);
                }
            };
            
            dataChannel.onclose = () => {
                console.log('Kênh dữ liệu kiểm tra âm thanh đã đóng');
            };
        } catch (e) {
            console.warn('Không thể tạo kênh dữ liệu:', e);
        }
        
        pc.onicecandidate = (event) => {
            if (event.candidate && callDocRef.current) {
                console.log('New ICE candidate:', event.candidate.candidate.substring(0, 50) + '...');
                const candidatesCollection = collection(db, 'calls', callDocRef.current, 'candidates');
                addDoc(candidatesCollection, {
                    ...event.candidate.toJSON(),
                    userId: userId,
                });
            }
        };

        pc.ontrack = (event) => {
            console.log('Received remote track:', event.track.kind, 'ID:', event.track.id, 'ReadyState:', event.track.readyState);
            
            // Đảm bảo các track luôn được kích hoạt khi được nhận
            if (!event.track.enabled) {
                console.log(`Forcing enable on received ${event.track.kind} track`);
                event.track.enabled = true;
            }
            
            // Xử lý audio track đặc biệt
            if (event.track.kind === 'audio') {
                // Helper function để hiển thị mức âm thanh trực quan
                const getVolumeIndicator = (level: number): string => {
                    if (level < 20) return '▪';
                    if (level < 40) return '▪▪';
                    if (level < 60) return '▪▪▪';
                    if (level < 80) return '▪▪▪▪';
                    return '▪▪▪▪▪';
                };

                console.log(`Đã nhận audio track từ đối phương: ID=${event.track.id}, ReadyState=${event.track.readyState}`);
                
                // CÁCH 1: Kết nối trực tiếp vào hệ thống âm thanh
                try {
                    if (globalAudioContext) {
                        console.log('Đang thiết lập kết nối âm thanh trực tiếp qua AudioContext toàn cục');
                        
                        // Tạo một MediaStream chỉ chứa track âm thanh này
                        const audioStream = new MediaStream([event.track]);
                        
                        // Tạo nguồn âm thanh từ stream
                        const source = globalAudioContext.createMediaStreamSource(audioStream);
                        
                        // Kết nối trực tiếp với đầu ra
                        source.connect(globalAudioContext.destination);
                        
                        console.log('Kết nối âm thanh trực tiếp đã được thiết lập thành công');
                        
                        // Phân tích âm thanh
                        const analyser = globalAudioContext.createAnalyser();
                        analyser.fftSize = 256;
                        source.connect(analyser);
                        
                        const bufferLength = analyser.frequencyBinCount;
                        const dataArray = new Uint8Array(bufferLength);
                        
                        // Phát hiện âm thanh
                        let silenceCounter = 0;
                        const soundDetector = setInterval(() => {
                            if (globalAudioContext?.state === 'suspended') {
                                globalAudioContext.resume().then(() => {
                                    console.log('AudioContext đã được tiếp tục sau khi tạm dừng');
                                });
                            }
                            
                            analyser.getByteFrequencyData(dataArray);
                            
                            // Tính mức âm thanh trung bình
                            let sum = 0;
                            for (let i = 0; i < bufferLength; i++) {
                                sum += dataArray[i];
                            }
                            const average = sum / bufferLength;
                            
                            // Hiển thị khi có âm thanh thực sự - ngưỡng thấp hơn để phát hiện dễ dàng hơn
                            if (average > 5) { // Giảm ngưỡng xuống 5 để dễ phát hiện hơn
                                const level = Math.floor(average);
                                console.log(`ĐÃ PHÁT HIỆN ÂM THANH TỪ ĐỐI PHƯƠNG! Mức: ${level} (${getVolumeIndicator(level)})`);
                                silenceCounter = 0;
                            } else {
                                silenceCounter++;
                                if (silenceCounter === 30) { // Tăng số lần kiểm tra trước khi thông báo
                                    console.log('Không phát hiện âm thanh từ đối phương... Thử nói to hơn hoặc kiểm tra micro của bạn');
                                    silenceCounter = 0;
                                }
                            }
                        }, 200);
                        
                        // Cleanup
                        event.track.onended = () => {
                            console.log(`Audio track ${event.track.id} kết thúc, dọn dẹp tài nguyên`);
                            clearInterval(soundDetector);
                            
                            // Không đóng AudioContext toàn cục
                        };
                    }
                } catch (err) {
                    console.error('Lỗi khi xử lý audio track trực tiếp:', err);
                }
                
                // CÁCH 2: Sử dụng phần tử audio truyền thống
                try {
                    // Tạo phần tử audio chuyên dụng
                    const audioElement = new Audio();
                    const audioStream = new MediaStream([event.track]);
                    
                    // Đảm bảo phần tử audio được cấu hình đúng
                    audioElement.srcObject = audioStream;
                    audioElement.id = `remote-audio-${event.track.id}`;
                    audioElement.autoplay = true;
                    audioElement.controls = true; // Thêm điều khiển để người dùng có thể điều chỉnh
                    audioElement.volume = 1.0;
                    audioElement.muted = false;
                    
                    // Thêm vào DOM để đảm bảo nó được phát
                    audioElement.style.display = 'none';
                    document.body.appendChild(audioElement);
                    
                    console.log(`Phần tử audio phụ đã được tạo: id=${audioElement.id}`);
                    
                    // Xử lý các sự kiện audio
                    audioElement.addEventListener('canplaythrough', () => {
                        console.log(`Audio element sẵn sàng phát, bắt đầu phát: id=${audioElement.id}`);
                        
                        // Thử kích hoạt âm thanh bằng tương tác người dùng
                        const playPromise = audioElement.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .then(() => {
                                    console.log('Phát âm thanh thành công qua phần tử audio');
                                })
                                .catch(err => {
                                    console.error('Lỗi khi phát âm thanh qua phần tử audio:', err);
                                    
                                    // Nếu tự động phát bị chặn, hiển thị nút để người dùng tương tác
                                    if (err.name === 'NotAllowedError') {
                                        const button = document.createElement('button');
                                        button.textContent = 'Nhấn để bật âm thanh cuộc gọi';
                                        button.style.position = 'fixed';
                                        button.style.top = '10px';
                                        button.style.right = '10px';
                                        button.style.zIndex = '9999';
                                        button.style.padding = '10px';
                                        button.style.backgroundColor = '#f44336';
                                        button.style.color = 'white';
                                        button.style.border = 'none';
                                        button.style.borderRadius = '5px';
                                        button.style.cursor = 'pointer';
                                        
                                        button.onclick = () => {
                                            // Tiếp tục AudioContext
                                            if (globalAudioContext?.state === 'suspended') {
                                                globalAudioContext.resume();
                                            }
                                            
                                            // Phát audio element
                                            audioElement.play()
                                                .then(() => {
                                                    console.log('Âm thanh đã được bật sau khi người dùng tương tác');
                                                    document.body.removeChild(button);
                                                })
                                                .catch(e => console.error('Vẫn không thể phát âm thanh sau khi tương tác:', e));
                                        };
                                        
                                        document.body.appendChild(button);
                                    }
                                });
                        }
                    });
                    
                    audioElement.addEventListener('play', () => {
                        console.log('Sự kiện PLAY đã được kích hoạt trên phần tử audio');
                    });
                    
                    audioElement.addEventListener('error', (e) => {
                        console.error(`Lỗi phần tử audio: id=${audioElement.id}`, e);
                    });
                } catch (e) {
                    console.error('Lỗi khi tạo phần tử audio dự phòng:', e);
                }
            }
            
            if (event.track) {
                setRemoteStream(prevRemoteStream => {
                    // Use the previous stream or create a new one if it doesn't exist.
                    // Create a new MediaStream instance from the tracks of the previous stream, or an empty one.
                    const newStream = new MediaStream(prevRemoteStream ? prevRemoteStream.getTracks() : []);

                    // Add the new track if it's not already in the stream.
                    if (!newStream.getTrackById(event.track.id)) {
                        newStream.addTrack(event.track);
                        console.log('Added new track to remote stream:', event.track.kind, 'ID:', event.track.id);
                    } else {
                        console.log('Track already present in remote stream:', event.track.kind, 'ID:', event.track.id);
                    }
                    
                    console.log('Remote stream now has tracks:', newStream.getTracks().map(t => `${t.kind} (ID: ${t.id}, ReadyState: ${t.readyState}, Enabled: ${t.enabled})`).join('; '));

                    // Attach listeners to the specific track that just arrived/was processed.
                    
                    if (event.track.kind === 'video' && !event.track.enabled && event.track.readyState === 'live') {
                        console.log(`Force enabling ${event.track.kind} track (ID: ${event.track.id}) as it was received disabled.`);
                        event.track.enabled = true;
                    }
                    
                    event.track.onmute = () => {
                        console.log(`Remote ${event.track.kind} track (ID: ${event.track.id}) muted. ReadyState: ${event.track.readyState}`);
                        // Attempt to unmute if it's still live
                        if (event.track.readyState === 'live' && !event.track.enabled) {
                            console.log(`Attempting to re-enable muted ${event.track.kind} track (ID: ${event.track.id})`);
                            event.track.enabled = true;
                        }
                    };
                    
                    event.track.onunmute = () => {
                        console.log(`Remote ${event.track.kind} track (ID: ${event.track.id}) unmuted. ReadyState: ${event.track.readyState}`);
                        if (event.track.readyState === 'live' && !event.track.enabled) {
                           event.track.enabled = true;
                        }
                    };
                    
                    event.track.onended = () => {
                        console.log(`Remote ${event.track.kind} track (ID: ${event.track.id}) ended. ReadyState: ${event.track.readyState}`);
                        // When a track ends, remove it from the remote stream by creating a new stream without it.
                        setRemoteStream(prev => {
                            if (!prev) return null;
                            const tracks = prev.getTracks().filter(t => t.id !== event.track.id);
                            if (tracks.length === 0) {
                                console.log('All remote tracks ended, setting remoteStream to null.');
                                return null;
                            }
                            const updatedStream = new MediaStream(tracks);
                            console.log('Track ended. Remote stream updated. Remaining tracks:', updatedStream.getTracks().map(t => `${t.kind} (ID: ${t.id})`).join(', '));
                            return updatedStream;
                        });
                    };
                    
                    // Cập nhật các hàm callback cho các track
                    if (event.track.kind === 'audio') {
                        console.log('Remote audio track received with settings:', {
                            echoCancellation: event.track.getSettings().echoCancellation,
                            autoGainControl: event.track.getSettings().autoGainControl,
                            noiseSuppression: event.track.getSettings().noiseSuppression,
                            channelCount: event.track.getSettings().channelCount,
                            sampleRate: event.track.getSettings().sampleRate
                        });
                    }
                    
                    // Always return a new MediaStream instance containing all current tracks.
                    // This ensures React detects the change and re-renders components that depend on remoteStream.
                    return new MediaStream(newStream.getTracks());
                });
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log('ICE Connection State:', pc.iceConnectionState);
            if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
                console.log('ICE connection established!');
            } else if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
                console.error('ICE connection failed or disconnected');
            }
        };

        pc.onicegatheringstatechange = () => {
            console.log('ICE Gathering State:', pc.iceGatheringState);
        };

        pc.onsignalingstatechange = () => {
            console.log('Signaling State:', pc.signalingState);
        };

        pc.onconnectionstatechange = () => {
            console.log('Connection State:', pc.connectionState);
            if (pc.connectionState === 'connected') {
                console.log('Peers connected!');
            } else if (pc.connectionState === 'failed') {
                console.error('Connection failed');
                endCall();
            }
        };

        pc.onnegotiationneeded = () => {
            console.log('Negotiation needed');
        };

        pc.ondatachannel = (event) => {
            console.log('Nhận được kênh dữ liệu từ đối phương:', event.channel.label);
            
            const channel = event.channel;
            
            channel.onopen = () => {
                console.log('Kênh dữ liệu đã mở:', channel.label);
            };
            
            channel.onmessage = (msg) => {
                try {
                    const data = JSON.parse(msg.data);
                    if (data.type === 'audioCheck') {
                        // Phản hồi lại kiểm tra âm thanh
                        channel.send(JSON.stringify({
                            type: 'audioCheckResponse',
                            timestamp: Date.now(),
                            receivedTimestamp: data.timestamp
                        }));
                    } else if (data.type === 'audioCheckResponse') {
                        const latency = Date.now() - data.timestamp;
                        console.log(`Kết nối với đối phương ổn định. Độ trễ: ${latency}ms`);
                    }
                } catch (e) {
                    console.error('Lỗi khi xử lý tin nhắn từ kênh dữ liệu:', e);
                }
            };
            
            channel.onclose = () => {
                console.log('Kênh dữ liệu đã đóng:', channel.label);
            };
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [userId, endCall]);

    const startCall = useCallback(
        async (targetId: string, targetType: MESSAGE_TARGET_TYPE) => {
            try {
                let stream;
                try {
                    // Cải thiện các ràng buộc trong getUserMedia
                    const audioConstraints: MediaTrackConstraints = {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    };
                    
                    // Kiểm tra hỗ trợ của trình duyệt
                    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
                    console.log('Supported constraints:', supportedConstraints);
                    
                    // Thêm các ràng buộc được hỗ trợ
                    if (supportedConstraints.channelCount) {
                        (audioConstraints as MediaTrackConstraints & { channelCount: number }).channelCount = 2;
                    }
                    if (supportedConstraints.sampleRate) {
                        (audioConstraints as MediaTrackConstraints & { sampleRate: number }).sampleRate = 48000;
                    }
                    if (supportedConstraints.sampleSize) {
                        (audioConstraints as MediaTrackConstraints & { sampleSize: number }).sampleSize = 16;
                    }
                    
                    console.log('Using audio constraints:', audioConstraints);
                    
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: audioConstraints
                    });
                    
                    // Kiểm tra khả năng của thiết bị âm thanh
                    console.log('Available constraints:', navigator.mediaDevices.getSupportedConstraints());
                } catch (err: unknown) {
                    if (
                        err instanceof DOMException &&
                        (err.name === 'NotFoundError' || err.name === 'NotAllowedError')
                    ) {
                        try {
                            stream = await navigator.mediaDevices.getUserMedia({
                                video: false,
                                audio: {
                                    echoCancellation: true,
                                    noiseSuppression: true,
                                    autoGainControl: true
                                }
                            });
                        } catch (audioErr) {
                            throw new Error('Không thể tìm thấy thiết bị âm thanh. Vui lòng kiểm tra micro của bạn.');
                        }
                    } else {
                        throw err;
                    }
                }

                console.log('Local stream obtained with tracks:', stream.getTracks().map(t => t.kind).join(', '));
                
                // Kiểm tra audio track và log thông tin
                const audioTracks = stream.getAudioTracks();
                if (audioTracks.length > 0) {
                    const audioTrack = audioTracks[0];
                    console.log('Local audio track obtained with settings:', {
                        trackId: audioTrack.id,
                        label: audioTrack.label,
                        enabled: audioTrack.enabled,
                        muted: audioTrack.muted,
                        readyState: audioTrack.readyState,
                        constraints: audioTrack.getConstraints(),
                        settings: audioTrack.getSettings()
                    });
                } else {
                    console.warn('No audio track found in local stream!');
                }
                
                setLocalStream(stream);

                // Clear existing remote stream
                setRemoteStream(null);

                const pc = createPeerConnection();

                stream.getTracks().forEach((track) => {
                    console.log('Adding local track to peer connection:', track.kind);
                    pc.addTrack(track, stream);
                });

                // Cải thiện cấu hình tạo offer
                const offerOptions = {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                    voiceActivityDetection: true,
                    iceRestart: false,
                };
                
                console.log('Creating offer with options:', offerOptions);
                const offerDescription = await pc.createOffer(offerOptions);
                
                await pc.setLocalDescription(offerDescription);
                console.log('Created offer and set local description');

                const callsCollection = collection(db, 'calls');
                const callDoc = await addDoc(callsCollection, {
                    caller: userId,
                    target: targetId,
                    targetType: targetType,
                    status: 'pending',
                    created: new Date().toISOString(),
                    offer: {
                        type: offerDescription.type,
                        sdp: offerDescription.sdp,
                    },
                });
                console.log('Created call document in Firestore');

                callDocRef.current = callDoc.id;
                setCurrentCallId(callDoc.id);
                setCurrentCallTargetId(targetId);
                setCurrentCallTargetType(targetType);
                setIsCalling(true);

                onSnapshot(doc(db, 'calls', callDoc.id), (snapshot) => {
                    const data = snapshot.data();
                    if (data?.answer && pc.currentRemoteDescription === null) {
                        const answerDescription = new RTCSessionDescription({
                            type: 'answer',
                            sdp: data.answer.sdp,
                        });
                        pc.setRemoteDescription(answerDescription).catch(error => {
                            console.error('Error setting remote description:', error);
                        });
                    }

                    if (data?.status === 'rejected') {
                        endCall();
                    }
                });

                onSnapshot(
                    query(collection(db, 'calls', callDoc.id, 'candidates'), where('userId', '!=', userId)),
                    (snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                const data = change.doc.data();
                                pc.addIceCandidate(
                                    new RTCIceCandidate({
                                        sdpMid: data.sdpMid,
                                        sdpMLineIndex: data.sdpMLineIndex,
                                        candidate: data.candidate,
                                    })
                                ).catch(error => {
                                    console.error('Error adding ICE candidate:', error);
                                });
                            }
                        });
                    }
                );
            } catch (error) {
                console.error('Error starting call:', error);
                endCall();
            }
        },
        [userId, createPeerConnection, endCall]
    );

    const answerCall = useCallback(async () => {
        if (!currentCallId) return;

        try {
            let stream;
            try {
                // Thử lấy cả video và audio
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });
                
                // Kiểm tra khả năng của thiết bị âm thanh
                console.log('Available constraints (answer):', navigator.mediaDevices.getSupportedConstraints());
            } catch (err) {
                console.warn('Không thể lấy cả video và audio:', err);
                
                try {
                    // Nếu không thể lấy cả hai, thử chỉ lấy audio
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: false,
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true
                        }
                    });
                    console.log('Đã lấy được luồng chỉ chứa audio');
                } catch (audioErr) {
                    console.error('Không thể lấy audio:', audioErr);
                    
                    // Nếu không thể lấy audio, thử chỉ lấy video
                    try {
                        stream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false,
                        });
                        console.log('Đã lấy được luồng chỉ chứa video');
                    } catch (videoErr) {
                        console.error('Không thể lấy video:', videoErr);
                        throw new Error('Không thể truy cập camera hoặc micro. Thiết bị có thể đang bị sử dụng bởi ứng dụng khác.');
                    }
                }
            }

            console.log('Local stream obtained for answer with tracks:', stream.getTracks().map(t => t.kind).join(', '));
            
            // Kiểm tra audio track và log thông tin
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                const audioTrack = audioTracks[0];
                console.log('Local audio track obtained for answer with settings:', {
                    trackId: audioTrack.id,
                    label: audioTrack.label,
                    enabled: audioTrack.enabled,
                    muted: audioTrack.muted,
                    readyState: audioTrack.readyState,
                    constraints: audioTrack.getConstraints(),
                    settings: audioTrack.getSettings()
                });
            } else {
                console.warn('No audio track found in local stream for answer!');
            }
            
            setLocalStream(stream);
            
            // Clear existing remote stream
            setRemoteStream(null);

            const pc = createPeerConnection();

            stream.getTracks().forEach((track) => {
                console.log('Adding local track to peer connection:', track.kind);
                pc.addTrack(track, stream);
            });

            const callRef = doc(db, 'calls', currentCallId);
            const unsubscribeCallSnapshot = onSnapshot(callRef, async (snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.offer) {
                    const offerDescription = new RTCSessionDescription({
                        type: 'offer',
                        sdp: data.offer.sdp,
                    });
                    await pc.setRemoteDescription(offerDescription).catch(error => {
                        console.error('Error setting remote description:', error);
                    });
                    console.log('Set remote description from offer');

                    const answerDescription = await pc.createAnswer();
                    
                    // Không sửa đổi SDP nữa để tránh lỗi
                    await pc.setLocalDescription(answerDescription);
                    console.log('Created answer and set local description');

                    await setDoc(
                        callRef,
                        {
                            answer: {
                                type: answerDescription.type,
                                sdp: answerDescription.sdp,
                            },
                            status: 'active',
                        },
                        {merge: true}
                    ).catch(error => {
                        console.error('Error updating call doc with answer:', error);
                    });
                    console.log('Sent answer to caller via Firestore');

                    setTimeout(() => unsubscribeCallSnapshot(), 0);
                }
            });

            onSnapshot(
                query(collection(db, 'calls', currentCallId, 'candidates'), where('userId', '!=', userId)),
                (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            const data = change.doc.data();
                            pc.addIceCandidate(
                                new RTCIceCandidate({
                                    sdpMid: data.sdpMid,
                                    sdpMLineIndex: data.sdpMLineIndex,
                                    candidate: data.candidate,
                                })
                            ).catch(error => {
                                console.error('Error adding ICE candidate:', error);
                            });
                        }
                    });
                }
            );

            setIsReceivingCall(false);
            setIsCalling(true);
        } catch (error) {
            console.error('Error answering call:', error);
            rejectCall();
        }
    }, [currentCallId, userId, createPeerConnection, rejectCall]);

    // Listen for incoming calls
    useEffect(() => {
        if (!userId) return;

        const q = query(collection(db, 'calls'), where('target', '==', userId), where('status', '==', 'pending'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const callData = change.doc.data();
                    setCurrentCallId(change.doc.id);
                    setCurrentCallTargetId(callData.caller);
                    setCurrentCallTargetType(callData.targetType);
                    setIsReceivingCall(true);
                }
            });
        });

        return () => unsubscribe();
    }, [userId]);

    // Listen for call status changes
    useEffect(() => {
        if (!currentCallId) return;

        const unsubscribe = onSnapshot(doc(db, 'calls', currentCallId), (snapshot) => {
            const data = snapshot.data();
            if (data?.status === 'ended' || data?.status === 'rejected') {
                endCall();
            }
        });

        return () => unsubscribe();
    }, [currentCallId, endCall]);

    const value = {
        localStream,
        remoteStream,
        isCalling,
        isReceivingCall,
        currentCallId,
        currentCallTargetId,
        currentCallTargetType,
        startCall,
        answerCall,
        endCall,
        rejectCall,
    };

    return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};

export const useWebRTCContext = () => {
    const context = useContext(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRTCProvider');
    }
    return context;
};

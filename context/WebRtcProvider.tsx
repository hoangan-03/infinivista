'use client';

import {addDoc, collection, doc, getDoc,onSnapshot, query, setDoc, where} from 'firebase/firestore';
import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';

import {useGetProfileInfo} from '@/hooks';
import {db} from '@/lib/firebase';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';

interface WebRTCContextType {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    isCalling: boolean;
    isReceivingCall: boolean;
    currentCallId: string | null;
    currentCallTargetId: string | null;
    currentCallTargetType: MESSAGE_TARGET_TYPE | null;
    firebaseStatus: 'checking' | 'connected' | 'error';
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
    const [currentCallId, setCurrentCallId] = useState<string | null>(null);
    const [currentCallTargetId, setCurrentCallTargetId] = useState<string | null>(null);
    const [currentCallTargetType, setCurrentCallTargetType] = useState<MESSAGE_TARGET_TYPE | null>(null);
    const [firebaseStatus, setFirebaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const callDocRef = useRef<string | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);

    // Cấu hình ICE servers
    const servers = {
        iceServers: [
            {urls: 'stun:stun1.l.google.com:19302'},
            {urls: 'stun:stun2.l.google.com:19302'},
            {urls: 'stun:stun.l.google.com:19302'},
            {urls: 'stun:stun3.l.google.com:19302'},
            {urls: 'stun:stun4.l.google.com:19302'},
        ],
        iceCandidatePoolSize: 10,
    };

    // Kiểm tra kết nối Firebase
    useEffect(() => {
        console.log('[Firebase] Kiểm tra kết nối Firebase...');
        setFirebaseStatus('checking');
        // Tạo một document test để kiểm tra kết nối
        const testCollection = collection(db, 'connection_tests');
        addDoc(testCollection, {
            timestamp: new Date().toISOString(),
            userId: userId || 'anonymous',
            message: 'WebRTC connection test'
        })
        .then(docRef => {
            console.log('[Firebase] Kết nối thành công! Document ID:', docRef.id);
            // Xóa document test sau khi kiểm tra
            setDoc(docRef, { deleted: true }, { merge: true })
                .then(() => {
                    console.log('[Firebase] Đã cập nhật document test thành công');
                    setFirebaseStatus('connected');
                })
                .catch(error => {
                    console.error('[Firebase] Lỗi khi cập nhật document test:', error);
                    setFirebaseStatus('error');
                });
        })
        .catch(error => {
            console.error('[Firebase] Lỗi kết nối Firebase:', error);
            setFirebaseStatus('error');
        });
    }, [userId]);

    // Dọn dẹp và kết thúc cuộc gọi
    const endCall = useCallback(() => {
        // Dừng tất cả tracks trong localStream
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                console.log(`Dừng local track: ${track.kind}`);
                track.stop();
            });
        }

        // Dừng tất cả tracks trong remoteStream
        if (remoteStreamRef.current) {
            remoteStreamRef.current.getTracks().forEach((track) => {
                console.log(`Dừng remote track: ${track.kind}`);
                track.stop();
            });
        }

        // Đóng kết nối peer
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            console.log('Đã đóng kết nối peer');
            peerConnectionRef.current = null;
        }

        // Cập nhật trạng thái cuộc gọi trong Firestore
        if (callDocRef.current) {
            setDoc(doc(db, 'calls', callDocRef.current), {status: 'ended'}, {merge: true}).catch(console.error);
            callDocRef.current = null;
        }

        // Reset state
        setLocalStream(null);
        setRemoteStream(null);
        remoteStreamRef.current = null;
        setIsCalling(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [localStream]);

    // Từ chối cuộc gọi
    const rejectCall = useCallback(() => {
        if (currentCallId) {
            setDoc(doc(db, 'calls', currentCallId), {status: 'rejected'}, {merge: true}).catch(console.error);
        }

        setIsReceivingCall(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [currentCallId]);

    // Lấy stream từ thiết bị
    const getMediaStream = async () => {
        try {
            console.log('[WebRTC] Lấy media stream từ thiết bị');
            
            // Thử phương án 1: Lấy cả video và audio
            try {
                const constraints = {
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                };
                console.log('[WebRTC] Thử lấy cả video và audio với constraints:', JSON.stringify(constraints));
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                
                console.log('[WebRTC] Đã lấy cả video và audio stream');
                console.log(`[WebRTC] Audio tracks: ${stream.getAudioTracks().length}, Video tracks: ${stream.getVideoTracks().length}`);
                stream.getTracks().forEach(track => {
                    console.log(`[WebRTC] Track: ${track.kind}, ID: ${track.id}, Enabled: ${track.enabled}, Muted: ${track.muted}`);
                });
                
                return stream;
            } catch (err) {
                console.warn('[WebRTC] Không thể lấy cả video và audio:', err);
                
                // Thử phương án 2: Chỉ lấy audio
                try {
                    console.log('[WebRTC] Thử lấy chỉ audio...');
                    const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
                        video: false,
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true
                        }
                    });
                    
                    console.log('[WebRTC] Đã lấy được audio-only stream');
                    console.log(`[WebRTC] Audio tracks: ${audioOnlyStream.getAudioTracks().length}`);
                    return audioOnlyStream;
                } catch (audioErr) {
                    console.error('[WebRTC] Không thể lấy audio:', audioErr);
                    
                    // Thử phương án 3: Chỉ lấy video
                    try {
                        console.log('[WebRTC] Thử lấy chỉ video...');
                        const videoOnlyStream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false
                        });
                        
                        console.log('[WebRTC] Đã lấy được video-only stream');
                        console.log(`[WebRTC] Video tracks: ${videoOnlyStream.getVideoTracks().length}`);
                        return videoOnlyStream;
                    } catch (videoErr) {
                        console.error('[WebRTC] Không thể lấy video:', videoErr);
                        
                        // Phương án 4: Thử sử dụng getDisplayMedia nếu getUserMedia thất bại
                        try {
                            console.log('[WebRTC] Thử getDisplayMedia thay thế...');
                            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                                video: true,
                                audio: true
                            });
                            console.log('[WebRTC] Đã lấy được displayMedia stream');
                            return displayStream;
                        } catch (displayErr) {
                            console.error('[WebRTC] Cũng không thể lấy displayMedia:', displayErr);
                            alert('Không thể truy cập camera hoặc microphone. Hãy kiểm tra quyền truy cập thiết bị của bạn.');
                            throw new Error('Không thể truy cập camera hoặc microphone');
                        }
                    }
                }
            }
        } catch (err) {
            console.error('[WebRTC] Lỗi nghiêm trọng khi lấy stream:', err);
            throw err;
        }
    };

    // Cấu hình sự kiện ontrack để xử lý media streams từ xa
    const configureOnTrackEvent = (pc: RTCPeerConnection) => {
        // Tạo remoteStream một lần và lưu trong ref
        if (!remoteStreamRef.current) {
            remoteStreamRef.current = new MediaStream();
            setRemoteStream(remoteStreamRef.current);
        }
        
        pc.ontrack = (event) => {
            console.log(`[WebRTC] Nhận track từ xa: ${event.track.kind}, ID: ${event.track.id}`);
            console.log(`[WebRTC] Track có ${event.streams.length} streams`);
            
            // Đảm bảo track được kích hoạt
            event.track.enabled = true;
            
            // Sử dụng một hàm riêng để xử lý thêm track vào remote stream
            const addTrackToRemoteStream = (track: MediaStreamTrack) => {
                if (!remoteStreamRef.current) return;
                
                // Kiểm tra nếu track đã tồn tại (tránh trùng lặp)
                const existingTrack = remoteStreamRef.current.getTracks().find(t => 
                    t.id === track.id || (t.kind === track.kind && t.label === track.label)
                );
                
                if (!existingTrack) {
                    console.log(`[WebRTC] Thêm mới track ${track.kind} (${track.id}) vào remoteStream`);
                    remoteStreamRef.current.addTrack(track);
                    
                    // Thêm sự kiện theo dõi trạng thái của track
                    track.onended = () => {
                        console.log(`[WebRTC] Track ${track.kind} (${track.id}) đã kết thúc`);
                    };
                    
                    track.onmute = () => {
                        console.log(`[WebRTC] Track ${track.kind} (${track.id}) đã bị mute`);
                        // Thử kích hoạt lại track
                        setTimeout(() => {
                            if (track.readyState === 'live') {
                                track.enabled = true;
                                console.log(`[WebRTC] Đã kích hoạt lại track ${track.kind} (${track.id})`);
                            }
                        }, 1000);
                    };
                    
                    track.onunmute = () => {
                        console.log(`[WebRTC] Track ${track.kind} (${track.id}) đã được unmute`);
                    };
                    
                    // Cập nhật UI với stream mới
                    setRemoteStream(new MediaStream(remoteStreamRef.current.getTracks()));
                } else {
                    console.log(`[WebRTC] Track ${track.kind} đã tồn tại trong remoteStream, bỏ qua`);
                }
            };
            
            // Xử lý các track từ stream nhận được
            if (event.streams && event.streams.length > 0) {
                console.log(`[WebRTC] Sử dụng stream từ sự kiện ontrack. Stream ID: ${event.streams[0].id}`);
                event.streams[0].getTracks().forEach(addTrackToRemoteStream);
                
                // Thêm sự kiện lắng nghe khi stream thêm track mới
                event.streams[0].onaddtrack = (trackEvent) => {
                    console.log(`[WebRTC] Track mới được thêm vào stream: ${trackEvent.track.kind}`);
                    addTrackToRemoteStream(trackEvent.track);
                };
            } else {
                // Thêm track trực tiếp nếu không có stream
                console.log(`[WebRTC] Không có stream, thêm track trực tiếp: ${event.track.kind}`);
                addTrackToRemoteStream(event.track);
            }
        };
    };

    // Bắt đầu cuộc gọi
    const startCall = useCallback(
        async (targetId: string, targetType: MESSAGE_TARGET_TYPE) => {
            try {
                // 1. Tạo kết nối peer
                const pc = new RTCPeerConnection(servers);
                peerConnectionRef.current = pc;

                // 2. Lấy media stream từ thiết bị
                const stream = await getMediaStream();
                setLocalStream(stream);

                // 3. Cấu hình sự kiện ontrack
                configureOnTrackEvent(pc);

                // 4. Thêm tracks từ local stream vào peer connection
                stream.getTracks().forEach((track) => {
                    console.log(`[WebRTC] Thêm track vào sender: ${track.kind} (ID: ${track.id}), enabled=${track.enabled}`);
                    // Đảm bảo track được kích hoạt
                    track.enabled = true;
                    pc.addTrack(track, stream);
                });

                // 5. Thiết lập sự kiện kết nối
                pc.onconnectionstatechange = (event) => {
                    console.log(`[WebRTC] Trạng thái kết nối thay đổi: ${pc.connectionState}`);
                    if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
                        console.warn(`[WebRTC] Kết nối bị ngắt: ${pc.connectionState}`);
                    }
                };

                // 6. Set up onicecandidate để thu thập và lưu ICE candidates
                pc.onicecandidate = (event) => {
                    if (event.candidate && callDocRef.current) {
                        console.log(`[WebRTC] ICE candidate mới: ${event.candidate.type}`);
                        const candidatesCollection = collection(db, 'calls', callDocRef.current, 'candidates');
                        addDoc(candidatesCollection, {
                            ...event.candidate.toJSON(),
                            userId: userId,
                        });
                    }
                };

                // 7. Tạo offer
                const offerDescription = await pc.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                });
                await pc.setLocalDescription(offerDescription);

                // 8. Lưu offer vào Firestore
                try {
                    const callDoc = await addDoc(collection(db, 'calls'), {
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
                    console.log('[Firebase] Đã lưu offer vào Firestore thành công, docId:', callDoc.id);

                    callDocRef.current = callDoc.id;
                    setCurrentCallId(callDoc.id);
                    setCurrentCallTargetId(targetId);
                    setCurrentCallTargetType(targetType);
                    setIsCalling(true);

                    // 9. Lắng nghe answer từ phía bên kia
                    onSnapshot(doc(db, 'calls', callDoc.id), (snapshot) => {
                        try {
                            console.log('[Firebase] Nhận được cập nhật từ document cuộc gọi:', callDoc.id);
                            const data = snapshot.data();
                            console.log('[Firebase] Dữ liệu nhận được:', data ? Object.keys(data) : 'null');
                            
                            if (data?.answer && pc.currentRemoteDescription === null) {
                                console.log('[Firebase] Nhận được answer, thiết lập remote description');
                                try {
                                    const answerDescription = new RTCSessionDescription({
                                        type: 'answer',
                                        sdp: data.answer.sdp,
                                    });
                                    pc.setRemoteDescription(answerDescription)
                                        .then(() => {
                                            console.log('[WebRTC] Đã thiết lập remote description thành công');
                                        })
                                        .catch(error => {
                                            console.error('[WebRTC] Lỗi khi thiết lập remote description:', error);
                                        });
                                } catch (error) {
                                    console.error('[WebRTC] Lỗi khi tạo RTCSessionDescription:', error);
                                }
                            }

                            if (data?.status === 'rejected') {
                                console.log('[Firebase] Cuộc gọi bị từ chối');
                                endCall();
                            }
                        } catch (error) {
                            console.error('[Firebase] Lỗi xử lý snapshot:', error);
                        }
                    });

                    // 10. Lắng nghe ICE candidates từ phía bên kia
                    onSnapshot(
                        query(collection(db, 'calls', callDoc.id, 'candidates'), where('userId', '!=', userId)),
                        (snapshot) => {
                            snapshot.docChanges().forEach((change) => {
                                if (change.type === 'added') {
                                    try {
                                        const data = change.doc.data();
                                        console.log('[Firebase] Nhận ICE candidate mới từ bên kia');
                                        pc.addIceCandidate(new RTCIceCandidate(data))
                                            .catch(error => {
                                                console.error('[WebRTC] Lỗi khi thêm ICE candidate:', error);
                                            });
                                    } catch (error) {
                                        console.error('[WebRTC] Lỗi khi xử lý ICE candidate:', error);
                                    }
                                }
                            });
                        }
                    );
                } catch (error) {
                    console.error('[Firebase] Lỗi khi lưu offer vào Firestore:', error);
                    throw new Error(`Firebase lỗi khi lưu offer: ${error instanceof Error ? error.message : String(error)}`);
                }
            } catch (error) {
                console.error('Lỗi khi bắt đầu cuộc gọi:', error);
                endCall();
            }
        },
        [userId, endCall]
    );

    // Trả lời cuộc gọi
    const answerCall = useCallback(async () => {
        if (!currentCallId) return;

        try {
            // 1. Tạo kết nối peer
            console.log('[WebRTC] Tạo kết nối peer cho answer');
            const pc = new RTCPeerConnection(servers);
            peerConnectionRef.current = pc;

            // 2. Lấy media stream từ thiết bị
            const stream = await getMediaStream();
            setLocalStream(stream);

            // 3. Cấu hình sự kiện ontrack
            configureOnTrackEvent(pc);

            // 4. Thêm tracks từ local stream vào peer connection
            stream.getTracks().forEach((track) => {
                console.log(`[WebRTC] Thêm track vào sender: ${track.kind} (ID: ${track.id}), enabled=${track.enabled}`);
                // Đảm bảo track được kích hoạt
                track.enabled = true;
                pc.addTrack(track, stream);
            });

            // 5. Thiết lập sự kiện kết nối
            pc.onconnectionstatechange = (event) => {
                console.log(`[WebRTC] Trạng thái kết nối thay đổi: ${pc.connectionState}`);
                if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
                    console.warn(`[WebRTC] Kết nối bị ngắt: ${pc.connectionState}`);
                }
            };

            // 6. Set up onicecandidate để thu thập và lưu ICE candidates
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('[WebRTC] Có ICE candidate mới cho answer');
                    try {
                        const candidatesCollection = collection(db, 'calls', currentCallId, 'candidates');
                        addDoc(candidatesCollection, {
                            ...event.candidate.toJSON(),
                            userId: userId
                        })
                            .catch(error => {
                                console.error('[Firebase] Lỗi khi lưu ICE candidate answer:', error);
                            });
                    } catch (error) {
                        console.error('[Firebase] Lỗi truy cập collection candidates:', error);
                    }
                }
            };

            // 7. Lấy offer từ Firestore
            console.log('[Firebase] Lấy offer từ document:', currentCallId);
            const callRef = doc(db, 'calls', currentCallId);
            const callSnapshot = await getDoc(callRef);
            console.log('[Firebase] Đã lấy document:', callSnapshot.exists() ? 'tồn tại' : 'không tồn tại');
            
            const data = callSnapshot.data();
            console.log('[Firebase] Dữ liệu cuộc gọi:', data ? Object.keys(data) : 'null');

            if (!data) {
                throw new Error('Không tìm thấy dữ liệu cuộc gọi');
            }

            // 8. Set remote description từ offer
            console.log('[WebRTC] Thiết lập remote description từ offer');
            const offerDescription = new RTCSessionDescription({
                type: 'offer',
                sdp: data.offer.sdp,
            });
            await pc.setRemoteDescription(offerDescription);
            console.log('[WebRTC] Đã thiết lập remote description thành công');

            // 9. Tạo answer
            console.log('[WebRTC] Tạo answer');
            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);
            console.log('[WebRTC] Đã thiết lập local description thành công');

            // 10. Lưu answer vào Firestore
            console.log('[Firebase] Lưu answer vào Firestore');
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
            );
            console.log('[Firebase] Đã lưu answer thành công');

            // 11. Lắng nghe ICE candidates từ phía bên kia
            console.log('[Firebase] Thiết lập lắng nghe ICE candidates cho answer');
            onSnapshot(
                query(collection(db, 'calls', currentCallId, 'candidates'), where('userId', '!=', userId)),
                (snapshot) => {
                    console.log('[Firebase] Nhận cập nhật ICE candidates cho answer:', snapshot.docChanges().length);
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            try {
                                const data = change.doc.data();
                                console.log('[Firebase] ICE candidate mới cho answer');
                                pc.addIceCandidate(new RTCIceCandidate(data))
                                    .catch(error => console.error('[WebRTC] Lỗi khi thêm ICE candidate cho answer:', error));
                            } catch (error) {
                                console.error('[WebRTC] Lỗi xử lý ICE candidate cho answer:', error);
                            }
                        }
                    });
                }
            );

            callDocRef.current = currentCallId;
            setIsReceivingCall(false);
            setIsCalling(true);

        } catch (error) {
            console.error('Lỗi khi trả lời cuộc gọi:', error);
            rejectCall();
        }
    }, [currentCallId, userId, rejectCall]);

    // Kiểm tra định kỳ trạng thái audio track
    useEffect(() => {
        if (!remoteStreamRef.current || !isCalling) return;
        
        const interval = setInterval(() => {
            if (remoteStreamRef.current) {
                const audioTracks = remoteStreamRef.current.getAudioTracks();
                
                if (audioTracks.length === 0) {
                    console.warn('[WebRTC] Không phát hiện audio track trong remote stream');
                    return;
                }
                
                audioTracks.forEach(track => {
                    // Kiểm tra trạng thái của track
                    console.log(`[WebRTC] Kiểm tra audio track: ${track.id}, Enabled: ${track.enabled}, ReadyState: ${track.readyState}`);
                    
                    if (!track.enabled && track.readyState === 'live') {
                        console.log(`[WebRTC] Kích hoạt lại audio track ${track.id}`);
                        track.enabled = true;
                    }
                });
                
                // Đảm bảo cập nhật remoteStream trong state
                if (remoteStreamRef.current.getTracks().length > 0 && 
                    (!remoteStream || remoteStream.getTracks().length !== remoteStreamRef.current.getTracks().length)) {
                    console.log('[WebRTC] Cập nhật remoteStream trong state với các track mới');
                    setRemoteStream(new MediaStream(remoteStreamRef.current.getTracks()));
                }
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, [remoteStream, isCalling]);

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
        firebaseStatus,
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

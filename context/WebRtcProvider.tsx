'use client';

import {addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, where} from 'firebase/firestore';
import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';

import {useGetProfileInfo} from '@/hooks';
import {db} from '@/lib/firebase';
import {ICreateCallRequest} from '@/modules/calling/calling.interface';
import {CallingService} from '@/modules/calling/calling.service';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';

interface WebRTCContextType {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    isCalling: boolean;
    isReceivingCall: boolean;
    currentCallId: string | null;
    backendCallId: string | null;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callingService = new CallingService();
    const {userId} = useGetProfileInfo();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [isReceivingCall, setIsReceivingCall] = useState(false);
    const [currentCallId, setCurrentCallId] = useState<string | null>(null);
    const [currentCallTargetId, setCurrentCallTargetId] = useState<string | null>(null);
    const [currentCallTargetType, setCurrentCallTargetType] = useState<MESSAGE_TARGET_TYPE | null>(null);
    const [firebaseStatus, setFirebaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const [backendCallId, setBackendCallId] = useState<string | null>(null);

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const callDocRef = useRef<string | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
        setFirebaseStatus('checking');

        const testCollection = collection(db, 'connection_tests');
        addDoc(testCollection, {
            timestamp: new Date().toISOString(),
            userId: userId || 'anonymous',
            message: 'WebRTC connection',
        })
            .then((docRef) => {
                setDoc(docRef, {deleted: true}, {merge: true})
                    .then(() => {
                        setFirebaseStatus('connected');
                    })
                    .catch((error) => {
                        setFirebaseStatus('error');
                        console.error('[Firebase] Lỗi kết nối Firebase:', error);
                    });
            })
            .catch((error) => {
                console.error('[Firebase] Lỗi kết nối Firebase:', error);
                setFirebaseStatus('error');
            });
    }, [userId]);

    const endCall = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        if (remoteStreamRef.current) {
            remoteStreamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
        }

        // Đóng kết nối peer
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        // Kết thúc cuộc gọi ở Firebase
        if (callDocRef.current) {
            setDoc(doc(db, 'calls', callDocRef.current), {status: 'ended'}, {merge: true}).catch(console.error);
            callDocRef.current = null;
        }

        // Kết thúc cuộc gọi ở backend
        if (backendCallId) {
            callingService
                .endCall(backendCallId)
                .then(() => {
                    console.log('[Backend] Đã kết thúc cuộc gọi trên backend');
                })
                .catch((error) => {
                    console.error('[Backend] Lỗi khi kết thúc cuộc gọi trên backend:', error);
                });
            setBackendCallId(null);
        }

        setLocalStream(null);
        setRemoteStream(null);
        remoteStreamRef.current = null;
        setIsCalling(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [localStream, backendCallId, callingService]);

    const rejectCall = useCallback(() => {
        // Từ chối cuộc gọi ở Firebase
        if (currentCallId) {
            setDoc(doc(db, 'calls', currentCallId), {status: 'rejected'}, {merge: true}).catch(console.error);
        }

        // Từ chối cuộc gọi ở backend
        if (backendCallId) {
            callingService
                .rejectCall(backendCallId)
                .then(() => {
                    console.log('[Backend] Đã từ chối cuộc gọi trên backend');
                })
                .catch((error) => {
                    console.error('[Backend] Lỗi khi từ chối cuộc gọi trên backend:', error);
                });
            setBackendCallId(null);
        }

        setIsReceivingCall(false);
        setCurrentCallId(null);
        setCurrentCallTargetId(null);
        setCurrentCallTargetType(null);
    }, [currentCallId, backendCallId, callingService]);

    const getMediaStream = async () => {
        try {
            console.log('[WebRTC] Lấy media stream từ thiết bị');

            try {
                const constraints = {
                    video: {
                        width: {ideal: 640},
                        height: {ideal: 480},
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                    },
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                stream.getTracks().forEach((track) => {
                    console.log(
                        `[WebRTC] Track: ${track.kind}, ID: ${track.id}, Enabled: ${track.enabled}, Muted: ${track.muted}`
                    );
                });

                return stream;
            } catch (err) {
                console.warn('[WebRTC] Không thể lấy cả video và audio:', err);

                try {
                    const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
                        video: false,
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true,
                        },
                    });

                    return audioOnlyStream;
                } catch (audioErr) {
                    console.error('[WebRTC] Không thể lấy audio:', audioErr);

                    try {
                        const videoOnlyStream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false,
                        });

                        return videoOnlyStream;
                    } catch (videoErr) {
                        console.error('[WebRTC] Không thể lấy video:', videoErr);

                        try {
                            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                                video: true,
                                audio: true,
                            });
                            return displayStream;
                        } catch (displayErr) {
                            alert(
                                'Không thể truy cập camera hoặc microphone. Hãy kiểm tra quyền truy cập thiết bị của bạn.'
                            );
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

    const configureOnTrackEvent = (pc: RTCPeerConnection) => {
        if (!remoteStreamRef.current) {
            remoteStreamRef.current = new MediaStream();
            setRemoteStream(remoteStreamRef.current);
        }

        pc.ontrack = (event) => {
            event.track.enabled = true;

            const addTrackToRemoteStream = (track: MediaStreamTrack) => {
                if (!remoteStreamRef.current) return;

                const existingTrack = remoteStreamRef.current
                    .getTracks()
                    .find((t) => t.id === track.id || (t.kind === track.kind && t.label === track.label));

                if (!existingTrack) {
                    console.log(`[WebRTC] Thêm mới track ${track.kind} (${track.id}) vào remoteStream`);
                    remoteStreamRef.current.addTrack(track);

                    track.onended = () => {
                        console.log(`[WebRTC] Track ${track.kind} (${track.id}) đã kết thúc`);
                    };

                    track.onmute = () => {
                        console.log(`[WebRTC] Track ${track.kind} (${track.id}) đã bị mute`);
                        setTimeout(() => {
                            if (track.readyState === 'live') {
                                track.enabled = true;
                            }
                        }, 1000);
                    };

                    setRemoteStream(new MediaStream(remoteStreamRef.current.getTracks()));
                } else {
                    console.log(`[WebRTC] Track ${track.kind} đã tồn tại trong remoteStream, bỏ qua`);
                }
            };

            if (event.streams && event.streams.length > 0) {
                event.streams[0].getTracks().forEach(addTrackToRemoteStream);

                event.streams[0].onaddtrack = (trackEvent) => {
                    addTrackToRemoteStream(trackEvent.track);
                };
            } else {
                addTrackToRemoteStream(event.track);
            }
        };
    };

    const startCall = useCallback(
        async (targetId: string, targetType: MESSAGE_TARGET_TYPE) => {
            try {
                const pc = new RTCPeerConnection(servers);
                peerConnectionRef.current = pc;

                const stream = await getMediaStream();
                setLocalStream(stream);

                configureOnTrackEvent(pc);

                stream.getTracks().forEach((track) => {
                    track.enabled = true;
                    pc.addTrack(track, stream);
                });

                pc.onconnectionstatechange = () => {
                    console.log(`[WebRTC] Trạng thái kết nối thay đổi: ${pc.connectionState}`);
                    if (
                        pc.connectionState === 'failed' ||
                        pc.connectionState === 'disconnected' ||
                        pc.connectionState === 'closed'
                    ) {
                        console.warn(`[WebRTC] Kết nối bị ngắt: ${pc.connectionState}`);
                    }
                };

                pc.onicecandidate = (event) => {
                    if (event.candidate && callDocRef.current) {
                        const candidatesCollection = collection(db, 'calls', callDocRef.current, 'candidates');
                        addDoc(candidatesCollection, {
                            ...event.candidate.toJSON(),
                            userId: userId,
                        });
                    }
                };

                const offerDescription = await pc.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                await pc.setLocalDescription(offerDescription);

                try {
                    // Lưu thông tin cuộc gọi vào Firebase
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

                    callDocRef.current = callDoc.id;
                    setCurrentCallId(callDoc.id);
                    setCurrentCallTargetId(targetId);
                    setCurrentCallTargetType(targetType);
                    setIsCalling(true);

                    // Lưu thông tin cuộc gọi vào backend
                    try {
                        const createCallRequest: ICreateCallRequest = {
                            receiverId: targetId,
                        };

                        const callData = await callingService.initiateCall(createCallRequest);
                        setBackendCallId(callData.call_id);
                        console.log('[Backend] Đã tạo cuộc gọi trên backend với ID:', callData.call_id);
                    } catch (backendError) {
                        console.error('[Backend] Lỗi khi tạo cuộc gọi trên backend:', backendError);
                    }

                    onSnapshot(doc(db, 'calls', callDoc.id), (snapshot) => {
                        try {
                            const data = snapshot.data();

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
                                        .catch((error) => {
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

                    onSnapshot(
                        query(collection(db, 'calls', callDoc.id, 'candidates'), where('userId', '!=', userId)),
                        (snapshot) => {
                            snapshot.docChanges().forEach((change) => {
                                if (change.type === 'added') {
                                    try {
                                        const data = change.doc.data();
                                        pc.addIceCandidate(new RTCIceCandidate(data)).catch((error) => {
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
                    throw new Error(
                        `Firebase lỗi khi lưu offer: ${error instanceof Error ? error.message : String(error)}`
                    );
                }
            } catch (error) {
                console.error('Lỗi khi bắt đầu cuộc gọi:', error);
                endCall();
            }
        },
        [servers, userId, endCall, callingService]
    );

    const answerCall = useCallback(async () => {
        if (!currentCallId) return;

        try {
            const pc = new RTCPeerConnection(servers);
            peerConnectionRef.current = pc;

            const stream = await getMediaStream();
            setLocalStream(stream);

            configureOnTrackEvent(pc);

            stream.getTracks().forEach((track) => {
                console.log(
                    `[WebRTC] Thêm track vào sender: ${track.kind} (ID: ${track.id}), enabled=${track.enabled}`
                );
                track.enabled = true;
                pc.addTrack(track, stream);
            });

            pc.onconnectionstatechange = () => {
                console.log(`[WebRTC] Trạng thái kết nối thay đổi: ${pc.connectionState}`);
                if (
                    pc.connectionState === 'failed' ||
                    pc.connectionState === 'disconnected' ||
                    pc.connectionState === 'closed'
                ) {
                    console.warn(`[WebRTC] Kết nối bị ngắt: ${pc.connectionState}`);
                }
            };

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('[WebRTC] Có ICE candidate mới cho answer');
                    try {
                        const candidatesCollection = collection(db, 'calls', currentCallId, 'candidates');
                        addDoc(candidatesCollection, {
                            ...event.candidate.toJSON(),
                            userId: userId,
                        }).catch((error) => {
                            console.error('[Firebase] Lỗi khi lưu ICE candidate answer:', error);
                        });
                    } catch (error) {
                        console.error('[Firebase] Lỗi truy cập collection candidates:', error);
                    }
                }
            };

            const callRef = doc(db, 'calls', currentCallId);
            const callSnapshot = await getDoc(callRef);
            const data = callSnapshot.data();

            if (!data) {
                throw new Error('Không tìm thấy dữ liệu cuộc gọi');
            }

            // Gọi API chấp nhận cuộc gọi ở backend nếu có backendCallId
            if (backendCallId) {
                try {
                    await callingService.acceptCall(backendCallId);
                    console.log('[Backend] Đã chấp nhận cuộc gọi trên backend');
                } catch (backendError) {
                    console.error('[Backend] Lỗi khi chấp nhận cuộc gọi trên backend:', backendError);
                }
            } else if (currentCallTargetId) {
                // Nếu không có backendCallId nhưng có thông tin người gọi, có thể truy vấn để lấy call_id
                try {
                    // Lấy chi tiết cuộc gọi từ backend dựa trên ID người gọi
                    // Logic này có thể cần điều chỉnh tùy theo API backend của bạn
                    console.log(
                        '[Backend] Không có backend call ID. Tạo cuộc gọi mới với người gọi:',
                        currentCallTargetId
                    );
                } catch (backendError) {
                    console.error('[Backend] Lỗi khi truy vấn thông tin cuộc gọi:', backendError);
                }
            }

            const offerDescription = new RTCSessionDescription({
                type: 'offer',
                sdp: data.offer.sdp,
            });
            await pc.setRemoteDescription(offerDescription);

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);

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

            onSnapshot(
                query(collection(db, 'calls', currentCallId, 'candidates'), where('userId', '!=', userId)),
                (snapshot) => {
                    console.log('[Firebase] Nhận cập nhật ICE candidates cho answer:', snapshot.docChanges().length);
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            try {
                                const data = change.doc.data();
                                console.log('[Firebase] ICE candidate mới cho answer');
                                pc.addIceCandidate(new RTCIceCandidate(data)).catch((error) =>
                                    console.error('[WebRTC] Lỗi khi thêm ICE candidate cho answer:', error)
                                );
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
    }, [currentCallId, servers, userId, rejectCall, backendCallId, callingService, currentCallTargetId]);

    useEffect(() => {
        if (!remoteStreamRef.current || !isCalling) return;

        const interval = setInterval(() => {
            if (remoteStreamRef.current) {
                const audioTracks = remoteStreamRef.current.getAudioTracks();

                if (audioTracks.length === 0) {
                    console.warn('[WebRTC] Không phát hiện audio track trong remote stream');
                    return;
                }

                audioTracks.forEach((track) => {
                    if (!track.enabled && track.readyState === 'live') {
                        track.enabled = true;
                    }
                });

                if (
                    remoteStreamRef.current.getTracks().length > 0 &&
                    (!remoteStream || remoteStream.getTracks().length !== remoteStreamRef.current.getTracks().length)
                ) {
                    setRemoteStream(new MediaStream(remoteStreamRef.current.getTracks()));
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remoteStream, isCalling]);

    useEffect(() => {
        if (!userId) return;

        // Lắng nghe cuộc gọi đến từ Firebase
        const q = query(collection(db, 'calls'), where('target', '==', userId), where('status', '==', 'pending'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const callData = change.doc.data();
                    setCurrentCallId(change.doc.id);
                    setCurrentCallTargetId(callData.caller);
                    setCurrentCallTargetType(callData.targetType);

                    // Có thể thêm logic để lấy thông tin cuộc gọi từ backend ở đây
                    // Nhưng vì không biết cách backend xử lý cuộc gọi đến, nên tạm thời bỏ qua

                    setIsReceivingCall(true);
                }
            });
        });

        return () => unsubscribe();
    }, [userId]);

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
        backendCallId,
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

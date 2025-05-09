'use client';

import {addDoc, collection, doc, onSnapshot, query, setDoc, where} from 'firebase/firestore';
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
            localStream.getTracks().forEach((track) => track.stop());
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
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
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
        };

        const pc = new RTCPeerConnection(configuration);

        pc.onicecandidate = (event) => {
            if (event.candidate && callDocRef.current) {
                const candidatesCollection = collection(db, 'calls', callDocRef.current, 'candidates');
                addDoc(candidatesCollection, {
                    ...event.candidate.toJSON(),
                    userId: userId,
                });
            }
        };

        pc.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        peerConnectionRef.current = pc;
        return pc;
    }, [userId]);

    const startCall = useCallback(
        async (targetId: string, targetType: MESSAGE_TARGET_TYPE) => {
            try {
                let stream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true,
                    });
                } catch (err: unknown) {
                    if (
                        err instanceof DOMException &&
                        (err.name === 'NotFoundError' || err.name === 'NotAllowedError')
                    ) {
                        try {
                            stream = await navigator.mediaDevices.getUserMedia({
                                video: false,
                                audio: true,
                            });
                        } catch (audioErr) {
                            throw new Error('Không thể tìm thấy thiết bị âm thanh. Vui lòng kiểm tra micro của bạn.');
                        }
                    } else {
                        throw err;
                    }
                }

                setLocalStream(stream);

                const pc = createPeerConnection();

                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });

                const offerDescription = await pc.createOffer();
                await pc.setLocalDescription(offerDescription);

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
                        pc.setRemoteDescription(answerDescription);
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
                                );
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
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            setLocalStream(stream);

            const pc = createPeerConnection();

            stream.getTracks().forEach((track) => {
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
                            );
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

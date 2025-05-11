/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import {useEffect, useRef, useState} from 'react';

import {Icon} from '@/components/commons';
import {useWebRTCContext} from '@/context';
import {CallingService} from '@/modules/calling/calling.service';
import {MESSAGE_TARGET_TYPE} from '@/modules/common.enum';
import {useGetGroupChatById} from '@/modules/groupchat/groupchat.swr';
import {useGetProfileById} from '@/modules/profile/profile.swr';

interface Props {
    targetType: MESSAGE_TARGET_TYPE;
}
export const CallSection: React.FC<Props> = ({targetType}) => {
    const callingService = new CallingService();
    const {localStream, remoteStream, endCall, currentCallTargetId, backendCallId} = useWebRTCContext();
    let caller_name = '';
    let groupName = '';
    if (targetType === MESSAGE_TARGET_TYPE.USER) {
        const {data: userProfile} = useGetProfileById(currentCallTargetId || undefined);
        caller_name = userProfile?.username || '';
    } else {
        const {data: groupProfile} = useGetGroupChatById(currentCallTargetId || undefined);
        groupName = groupProfile?.group_name || '';
    }

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    const [callDuration, setCallDuration] = useState<string>('00:00:00');

    useEffect(() => {
        if (!remoteStream) return;

        let seconds = 0;
        const interval = setInterval(() => {
            seconds++;
            const hrs = Math.floor(seconds / 3600)
                .toString()
                .padStart(2, '0');
            const mins = Math.floor((seconds % 3600) / 60)
                .toString()
                .padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            setCallDuration(`${hrs}:${mins}:${secs}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [remoteStream]);

    // Set up local video stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = true;

            if (localStream.getVideoTracks().length > 0) {
                setIsVideoEnabled(localStream.getVideoTracks()[0].enabled);
            } else {
                setIsVideoEnabled(false);
            }

            if (localStream.getAudioTracks().length > 0) {
                setIsAudioEnabled(localStream.getAudioTracks()[0].enabled);
            } else {
                setIsAudioEnabled(false);
            }
        }
    }, [localStream]);

    const toggleVideo = () => {
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                const enabled = !videoTracks[0].enabled;
                videoTracks[0].enabled = enabled;
                setIsVideoEnabled(enabled);
            } else {
                console.log('No camera to toggle');
            }
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const enabled = !audioTracks[0].enabled;
                audioTracks[0].enabled = enabled;
                setIsAudioEnabled(enabled);
            } else {
                console.log('No microphone to toggle');
            }
        }
    };

    // Set up remote video stream
    useEffect(() => {
        const videoElement = remoteVideoRef.current;

        if (videoElement && remoteStream) {
            console.log('CallSection: Cập nhật remoteStream trên thẻ video.', {
                streamId: remoteStream.id,
                tracks: remoteStream.getTracks().map((t) => ({
                    kind: t.kind,
                    id: t.id,
                    readyState: t.readyState,
                    enabled: t.enabled,
                    muted: t.muted,
                })),
            });

            videoElement.muted = false;
            videoElement.volume = 1.0;

            // Thiết lập srcObject
            videoElement.srcObject = remoteStream;

            const handleLoadedMetadata = () => {
                console.log('CallSection: Remote video metadata loaded. Bắt đầu phát:', remoteStream.id);
                const playPromise = videoElement.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('CallSection: Remote video đang phát từ stream:', remoteStream.id);
                        })
                        .catch((e) => {
                            console.error('CallSection: Lỗi khi phát remote video:', e);

                            if (e.name === 'NotAllowedError') {
                                console.warn('CallSection: Autoplay bị chặn. Cần tương tác người dùng để phát.');
                                const playButton = document.createElement('button');
                                playButton.innerText = 'Nhấn để bật âm thanh';
                                playButton.className =
                                    'absolute inset-0 z-10 m-auto w-fit h-fit bg-blue-500 text-white rounded-lg px-4 py-2';
                                playButton.onclick = () => {
                                    videoElement
                                        .play()
                                        .then(() => {
                                            playButton.remove();
                                        })
                                        .catch(console.error);
                                };

                                if (videoElement.parentElement) {
                                    videoElement.parentElement.appendChild(playButton);
                                }
                            }
                        });
                }
            };

            const handleError = (e: Event) => {
                console.error('CallSection: Lỗi phần tử video remote:', e);
            };

            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            videoElement.addEventListener('error', handleError);
            const audioTracks = remoteStream.getAudioTracks();
            if (audioTracks.length > 0) {
                console.log('CallSection: Remote stream có audio tracks:', audioTracks.length);
                audioTracks.forEach((track) => {
                    console.log(
                        `CallSection: Thông tin audio track - ID: ${track.id}, Enabled: ${track.enabled}, Muted: ${track.muted}`
                    );
                    if (!track.enabled) {
                        console.log('CallSection: Kích hoạt audio track bị tắt');
                        track.enabled = true;
                    }
                });
            } else {
                console.warn('CallSection: Remote stream không có audio track nào!');
            }

            return () => {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.removeEventListener('error', handleError);
            };
        } else if (videoElement && !remoteStream) {
            console.log('CallSection: remoteStream là null. Xóa srcObject của video.');
            videoElement.srcObject = null;
        }
    }, [remoteStream]);

    // Thêm xử lý khi cuộc gọi kết thúc
    const handleEndCall = () => {
        // Gọi endCall từ WebRTC context
        endCall();
    };

    return (
        <div className='relative h-full overflow-hidden rounded-xl bg-[#2d3a5e] text-white'>
            {/* Header */}
            <div className='absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4'>
                <div>
                    <h2 className='text-xl font-bold'>
                        {targetType === MESSAGE_TARGET_TYPE.USER ? caller_name : groupName}
                    </h2>
                    <div className='mt-1 flex items-center gap-2 text-sm'>
                        <span className='flex size-4 items-center justify-center rounded-full bg-red-500'>
                            <span className='size-2 rounded-full bg-white' />
                        </span>
                        <span>REC</span>
                        <span>{callDuration}</span>
                        {backendCallId && <span className='text-xs text-gray-300'>ID: {backendCallId}</span>}
                    </div>
                </div>

                {/* <button className='flex items-center gap-1 bg-blue-500/50 hover:bg-blue-500/70 text-sm rounded-full px-3 py-1.5'>
                    <Icon name="plus" className="size-4" />
                    <span>Add user to the call</span>
                </button> */}
            </div>

            {/* Main Video Content */}
            <div className='relative h-full w-full'>
                {/* Remote Video */}
                <div className='absolute inset-0'>
                    {remoteStream && remoteStream.getVideoTracks().length > 0 ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            controls={false}
                            className='h-full w-full object-cover'
                        />
                    ) : (
                        <div className='flex h-full w-full items-center justify-center bg-[#1a2540]'>
                            <div className='text-center text-white'>
                                <Icon name='user' className='mx-auto mb-2 size-16' />
                                <p>Waiting for opponent response...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Participants */}
                <div className='absolute right-4 top-20 z-10 flex flex-col gap-2'>
                    <div className='size-14 overflow-hidden rounded-md border-2 border-yellow-400 bg-gray-200'>
                        {localStream && localStream.getVideoTracks().length > 0 ? (
                            <video
                                ref={localVideoRef}
                                autoPlay
                                playsInline
                                muted
                                controls={false}
                                className='h-full w-full object-cover'
                            />
                        ) : (
                            <div className='flex h-full w-full items-center justify-center bg-gray-400'>
                                <Icon name='user' className='size-6 text-white' />
                            </div>
                        )}
                    </div>
                </div>

                {/* Control Buttons */}
                <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-4'>
                    <button
                        className='flex size-12 items-center justify-center rounded-full bg-white'
                        onClick={toggleVideo}
                    >
                        <Icon name={isVideoEnabled ? 'video-on' : 'video-off'} className='size-6 text-gray-800' />
                    </button>
                    <button
                        onClick={handleEndCall}
                        className='flex size-12 items-center justify-center rounded-full bg-red-500'
                    >
                        <Icon name='phone-x-mark' className='size-6 text-white' />
                    </button>
                    <button
                        className='flex size-12 items-center justify-center rounded-full bg-white'
                        onClick={toggleAudio}
                    >
                        <Icon name={isAudioEnabled ? 'mic-on' : 'mic-off'} className='size-6 text-gray-800' />
                    </button>
                </div>
            </div>
        </div>
    );
};

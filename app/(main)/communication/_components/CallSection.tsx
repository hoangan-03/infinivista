'use client';

import {useEffect, useRef, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';
import {useWebRTCContext} from '@/context';

export const CallSection: React.FC = () => {
    const {localStream, remoteStream, endCall} = useWebRTCContext();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [isRemoteVideoReady, setIsRemoteVideoReady] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isTestingAudio, setIsTestingAudio] = useState(false);

    // Set up local video stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            console.log('Setting local video stream');
            localVideoRef.current.srcObject = localStream;

            // Cập nhật trạng thái ban đầu của video và audio dựa trên stream
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

    // Toggle video track
    const toggleVideo = () => {
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                const enabled = !videoTracks[0].enabled;
                videoTracks[0].enabled = enabled;
                setIsVideoEnabled(enabled);
                console.log(`Video ${enabled ? 'bật' : 'tắt'}`);
            } else {
                console.log('Không có camera để bật/tắt');
            }
        }
    };

    // Toggle audio track
    const toggleAudio = () => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const enabled = !audioTracks[0].enabled;
                audioTracks[0].enabled = enabled;
                setIsAudioEnabled(enabled);
                console.log(`Micro ${enabled ? 'bật' : 'tắt'}`);
            } else {
                console.log('Không có micro để bật/tắt');
            }
        }
    };

    // Audio test function
    const testAudio = () => {
        setIsTestingAudio(true);
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.frequency.value = 440; // A4 note
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1; // Low volume

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();

        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
            setIsTestingAudio(false);
        }, 1000);

        console.log('Audio test played');
    };

    // Set up remote video stream
    useEffect(() => {
        const videoElement = remoteVideoRef.current;

        if (videoElement && remoteStream) {
            console.log('CallSection: useEffect - remoteStream update. Assigning to video element.', {
                streamId: remoteStream.id,
                tracks: remoteStream
                    .getTracks()
                    .map((t) => ({
                        kind: t.kind,
                        id: t.id,
                        readyState: t.readyState,
                        enabled: t.enabled,
                        muted: t.muted,
                    })),
            });

            // Kiểm tra các audio track và đảm bảo chúng được kích hoạt
            const audioTracks = remoteStream.getAudioTracks();
            if (audioTracks.length > 0) {
                console.log('CallSection: Remote stream has audio tracks:', audioTracks.length);
                audioTracks.forEach((track) => {
                    console.log(
                        `CallSection: Audio track - ID: ${track.id}, Enabled: ${track.enabled}, Muted: ${track.muted}, ReadyState: ${track.readyState}`
                    );
                    if (!track.enabled) {
                        console.log('CallSection: Enabling disabled audio track');
                        track.enabled = true;
                    }
                });
            } else {
                console.warn('CallSection: Remote stream does not have any audio tracks!');
            }

            // Đặt lại srcObject ngay cả khi không có video track
            videoElement.srcObject = remoteStream;

            // Đảm bảo phát âm thanh ngay cả khi không có video track
            videoElement.muted = false;

            const handleLoadedMetadata = () => {
                console.log('CallSection: Remote video metadata loaded. Attempting to play stream:', remoteStream.id);
                videoElement
                    .play()
                    .then(() => {
                        console.log('CallSection: Remote video playing for stream:', remoteStream.id);
                        setIsRemoteVideoReady(true);
                    })
                    .catch((e) => {
                        console.error('CallSection: Error playing remote video for stream:', remoteStream.id, e);
                        if (e.name === 'NotAllowedError') {
                            console.warn(
                                'CallSection: Autoplay was prevented. User interaction might be required to play video.'
                            );
                        }
                    });
            };

            const handleError = (e: Event) => {
                console.error('CallSection: Remote video element error for stream:', remoteStream?.id, e);
            };

            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            videoElement.addEventListener('error', handleError);
            // videoElement.addEventListener('playing', () => console.log('CallSection: video event - playing', remoteStream?.id));
            // videoElement.addEventListener('waiting', () => console.log('CallSection: video event - waiting', remoteStream?.id));
            // videoElement.addEventListener('stalled', () => console.log('CallSection: video event - stalled', remoteStream?.id));
            // videoElement.addEventListener('suspend', () => console.log('CallSection: video event - suspend', remoteStream?.id));

            return () => {
                console.log('CallSection: Cleanup remoteStream effect for stream:', remoteStream?.id);
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                videoElement.removeEventListener('error', handleError);
                // If the videoElement.srcObject is this specific stream instance,
                // and this effect is cleaning up because remoteStream is changing or component is unmounting,
                // setting it to null can be a good practice.
                // However, check if this might cause issues if a new stream is set immediately.
                // if (videoElement.srcObject === remoteStream) {
                //     videoElement.srcObject = null;
                // }
            };
        } else if (videoElement && !remoteStream) {
            console.log('CallSection: remoteStream is null or has no video tracks. Clearing video srcObject.');
            videoElement.srcObject = null;
            setIsRemoteVideoReady(false);
        }
    }, [remoteStream]);

    return (
        <div className='relative flex h-[89vh] flex-col gap-5 rounded-xl bg-custom-conic p-6 shadow-callSection'>
            <h4 className='font-bold text-white'>Capstone Project Team</h4>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='relative size-4 rounded-full bg-red-500'>
                        <div className='absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white' />
                    </div>
                    <p className='text-gray-300'>REC</p>
                    <p className='text-gray-300'>00:02:18</p>
                </div>
                <p className='text-gray-300'>4 people joined</p>
            </div>
            <div className='relative flex-grow overflow-hidden rounded-xl bg-slate-900'>
                <div className='absolute bottom-4 z-10 flex w-full items-center justify-center gap-6'>
                    <Button
                        variant='icon'
                        size='icon'
                        className={`size-12 rounded-full ${isVideoEnabled ? 'bg-white hover:bg-slate-200' : 'bg-red-200 hover:bg-red-300'} active:scale-95`}
                        onClick={toggleVideo}
                    >
                        <Icon
                            name={isVideoEnabled ? 'video-camera' : 'video-camera-slash'}
                            width={16}
                            height={16}
                            className={isVideoEnabled ? '' : 'text-red-500'}
                        />
                    </Button>
                    <Button
                        variant='icon'
                        size='icon'
                        className='h-[72px] w-[72px] rounded-lg bg-red-500 hover:bg-red-600 active:scale-95'
                        onClick={endCall}
                    >
                        <Icon name='phone' className='text-white' width={36} height={36} />
                    </Button>
                    <Button
                        variant='icon'
                        size='icon'
                        className={`size-12 rounded-full ${isAudioEnabled ? 'bg-white hover:bg-slate-200' : 'bg-red-200 hover:bg-red-300'} active:scale-95`}
                        onClick={toggleAudio}
                    >
                        <Icon
                            name={isAudioEnabled ? 'microphone' : 'microphone-slash'}
                            className={isAudioEnabled ? '' : 'text-red-500'}
                        />
                    </Button>
                </div>

                {/* Audio Test Button */}
                <div className='absolute bottom-4 right-4'>
                    <Button
                        variant='secondary'
                        size='default'
                        onClick={testAudio}
                        disabled={isTestingAudio}
                        className='text-xs'
                    >
                        {isTestingAudio ? 'Đang phát...' : 'Kiểm tra loa'}
                    </Button>
                </div>

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
                        <div className='flex h-full w-full items-center justify-center bg-slate-800'>
                            <div className='text-center text-white'>
                                <Icon name='user' className='mx-auto mb-2 size-16' />
                                <p>Đang chờ kết nối video...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Local Video */}
                <div className='absolute bottom-2 right-2 h-40 w-72 overflow-hidden rounded-xl border border-slate-200'>
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
                        <div className='flex h-full w-full items-center justify-center bg-slate-700'>
                            <div className='text-center text-white'>
                                <Icon name='user' className='mx-auto mb-2 size-8' />
                                <p className='text-sm'>Bạn</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

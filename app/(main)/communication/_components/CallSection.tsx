'use client';

import {useEffect, useRef, useState} from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';
import {useWebRTCContext} from '@/context';

export const CallSection: React.FC = () => {
    const {localStream, remoteStream, endCall, firebaseStatus} = useWebRTCContext();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [isRemoteVideoReady, setIsRemoteVideoReady] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isTestingAudio, setIsTestingAudio] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<string>('Đang kiểm tra kết nối...');
    const [webrtcError, setWebrtcError] = useState<string | null>(null);
    const [audioStatus, setAudioStatus] = useState<string | null>(null);

    // Hiển thị trạng thái kết nối Firebase
    useEffect(() => {
        switch (firebaseStatus) {
            case 'checking':
                setConnectionStatus('Đang kiểm tra kết nối Firebase...');
                break;
            case 'connected':
                setConnectionStatus('Đã kết nối tới Firebase');
                break;
            case 'error':
                setConnectionStatus('Lỗi kết nối Firebase! Vui lòng thử lại.');
                setWebrtcError('Không thể kết nối với Firebase. Kiểm tra kết nối Internet của bạn.');
                break;
        }
    }, [firebaseStatus]);

    // Kiểm tra WebRTC connection
    useEffect(() => {
        if (!localStream && !remoteStream) {
            return;
        }

        // Kiểm tra trạng thái PeerConnection nếu đã có stream
        if (localStream && !remoteStream) {
            setConnectionStatus('Đã kết nối camera/microphone. Đang chờ kết nối với đối phương...');
        }

        if (remoteStream) {
            // Kiểm tra các track trong remoteStream
            if (remoteStream.getTracks().length === 0) {
                setWebrtcError(
                    'Đã kết nối nhưng không nhận được stream từ đối phương. Kiểm tra camera và micro của họ.'
                );
            } else {
                const audioTracks = remoteStream.getAudioTracks();
                const videoTracks = remoteStream.getVideoTracks();

                setConnectionStatus(
                    `Đã kết nối với đối phương! (Audio: ${audioTracks.length}, Video: ${videoTracks.length})`
                );
                setWebrtcError(null);

                if (audioTracks.length === 0) {
                    setAudioStatus('⚠️ Không có audio track từ đối phương');
                } else {
                    setAudioStatus(`✓ Đã kết nối audio (${audioTracks.length} tracks)`);
                }
            }
        }
    }, [localStream, remoteStream]);

    // Set up local video stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            console.log(
                'Đang thiết lập local video stream với các tracks:',
                localStream
                    .getTracks()
                    .map((t) => `${t.kind} (ID: ${t.id})`)
                    .join(', ')
            );
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.muted = true; // Luôn tắt tiếng local video để tránh echo

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

            // Đảm bảo thuộc tính audio không bị mute trên phần tử video
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
                            setIsRemoteVideoReady(true);
                        })
                        .catch((e) => {
                            console.error('CallSection: Lỗi khi phát remote video:', e);

                            // Xử lý trường hợp không tự động phát được
                            if (e.name === 'NotAllowedError') {
                                console.warn('CallSection: Autoplay bị chặn. Cần tương tác người dùng để phát.');

                                // Hiển thị nút để người dùng click để phát video
                                const playButton = document.createElement('button');
                                playButton.innerText = 'Nhấn để bật âm thanh';
                                playButton.className =
                                    'absolute inset-0 z-10 m-auto w-fit h-fit bg-blue-500 text-white rounded-lg px-4 py-2';
                                playButton.onclick = () => {
                                    videoElement
                                        .play()
                                        .then(() => {
                                            setIsRemoteVideoReady(true);
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

            // Kiểm tra trạng thái audio khi stream thay đổi
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
            setIsRemoteVideoReady(false);
        }
    }, [remoteStream]);

    // Update: Thêm kiểm tra định kỳ các track để đảm bảo chúng luôn được kích hoạt
    useEffect(() => {
        if (!remoteStream) return;

        const interval = setInterval(() => {
            // Kiểm tra các audio track
            const audioTracks = remoteStream.getAudioTracks();
            audioTracks.forEach((track) => {
                if (!track.enabled) {
                    console.log(`CallSection: Phát hiện audio track ${track.id} bị tắt, đang kích hoạt lại`);
                    track.enabled = true;
                }

                // Thêm kiểm tra trạng thái audio và in ra thông tin để gỡ lỗi
                console.log(
                    `CallSection: Kiểm tra audio - Track ${track.id}: enabled=${track.enabled}, readyState=${track.readyState}, muted=${track.muted}`
                );
            });

            // Kiểm tra các video track
            const videoTracks = remoteStream.getVideoTracks();
            videoTracks.forEach((track) => {
                if (!track.enabled) {
                    console.log(`CallSection: Phát hiện video track ${track.id} bị tắt, đang kích hoạt lại`);
                    track.enabled = true;
                }
            });

            // Kiểm tra xem remoteStream có được phát không
            if (remoteVideoRef.current && remoteVideoRef.current.paused && isRemoteVideoReady) {
                console.log('CallSection: Phát hiện video bị tạm dừng, đang khởi động lại...');
                remoteVideoRef.current.play().catch((e) => {
                    console.error('CallSection: Không thể phát lại video:', e);
                });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [remoteStream, isRemoteVideoReady]);

    // Kiểm tra âm thanh đầu ra định kỳ
    useEffect(() => {
        if (!remoteStream || !remoteStream.getAudioTracks().length) return;

        // Tạo AudioContext và AnalyserNode để theo dõi âm lượng
        let audioContext: AudioContext | null = null;
        let analyser: AnalyserNode | null = null;
        let dataArray: Uint8Array | null = null;
        let source: MediaStreamAudioSourceNode | null = null;

        try {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            // Kết nối remoteStream với analyser
            source = audioContext.createMediaStreamSource(remoteStream);
            source.connect(analyser);

            // KHÔNG kết nối đến destination để tránh phát lại âm thanh
            // analyser.connect(audioContext.destination);

            // Kiểm tra âm lượng định kỳ
            const volumeCheckInterval = setInterval(() => {
                if (!analyser || !dataArray) return;

                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                const average = sum / dataArray.length;

                console.log(`CallSection: Kiểm tra âm lượng - Trung bình: ${average.toFixed(2)}`);

                // Cập nhật trạng thái âm thanh dựa trên kết quả
                if (average < 1) {
                    setAudioStatus(`⚠️ Không phát hiện âm thanh (${average.toFixed(2)})`);
                } else if (average < 5) {
                    setAudioStatus(`⚠️ Âm thanh yếu (${average.toFixed(2)})`);
                } else {
                    setAudioStatus(`✓ Âm thanh OK (${average.toFixed(2)})`);
                }
            }, 1000);

            return () => {
                clearInterval(volumeCheckInterval);
                if (source) source.disconnect();
                if (analyser) analyser.disconnect();
                if (audioContext && audioContext.state !== 'closed') {
                    audioContext.close().catch(console.error);
                }
            };
        } catch (err) {
            console.error('CallSection: Lỗi khi thiết lập theo dõi âm thanh:', err);
            return () => {};
        }
    }, [remoteStream]);

    return (
        <div className='relative h-full overflow-hidden rounded-xl bg-slate-100'>
            {/* Trạng thái kết nối */}
            <div className='absolute left-0 right-0 top-0 z-10 bg-black bg-opacity-50 p-2 text-center text-sm text-white'>
                <p>{connectionStatus}</p>
                {webrtcError && <p className='text-red-400'>{webrtcError}</p>}
                {audioStatus && <p className='mt-1 text-xs'>{audioStatus}</p>}
            </div>

            {/* Nút điều khiển */}
            <div className='absolute bottom-4 left-0 right-0 z-10 mx-auto flex w-fit items-center space-x-2 rounded-full bg-black bg-opacity-50 p-2'>
                <button
                    onClick={toggleAudio}
                    className={`rounded-full p-2 ${isAudioEnabled ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    <Icon name={isAudioEnabled ? 'mic' : 'mic-off'} className='size-6' />
                </button>
                <button onClick={endCall} className='rounded-full bg-red-600 p-3 text-white'>
                    <Icon name='phone-off' className='size-6' />
                </button>
                <button
                    onClick={toggleVideo}
                    className={`rounded-full p-2 ${isVideoEnabled ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    <Icon name={isVideoEnabled ? 'video' : 'video-off'} className='size-6' />
                </button>
            </div>

            <div className='relative h-full w-full'>
                {/* Nút kiểm tra âm thanh */}
                <div className='absolute bottom-4 right-4 z-10'>
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
                <div className='absolute bottom-16 right-4 z-10 aspect-video h-32 overflow-hidden rounded-xl border-2 border-white'>
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

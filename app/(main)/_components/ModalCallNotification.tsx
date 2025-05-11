'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

import {Icon} from '@/components/commons';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    VisuallyHidden,
} from '@/components/ui';
import {useWebRTCContext} from '@/context';
import {CallingService} from '@/modules/calling/calling.service';
import {useGetProfileById} from '@/modules/profile/profile.swr';

const placeholderImage = '/assets/images/placeholder-avatar.png';

export const ModalCallNotification: React.FC = () => {
    const {isReceivingCall, currentCallTargetId, answerCall, rejectCall} = useWebRTCContext();
    const {data: callerProfile} = useGetProfileById(currentCallTargetId || undefined);
    const [ringEffect, setRingEffect] = useState<boolean>(true);

    useEffect(() => {
        if (!isReceivingCall) return;

        const interval = setInterval(() => {
            setRingEffect((prev) => !prev);
        }, 800);

        return () => clearInterval(interval);
    }, [isReceivingCall]);

    if (!isReceivingCall) return null;

    return (
        <Dialog open={isReceivingCall} onOpenChange={() => rejectCall()}>
            <DialogContent
                autoFocus={false}
                className='h-auto max-w-md rounded-xl bg-gradient-to-b from-blue-50 to-white p-6 shadow-xl'
            >
                <DialogHeader>
                    <DialogTitle className='flex flex-col items-center'>
                        <div className='relative mb-2'>
                            {/* Vòng tròn hiệu ứng rung chuông */}
                            <div
                                className={`absolute inset-0 rounded-full ${ringEffect ? 'scale-125 bg-blue-100' : 'scale-150 bg-transparent'} transition-all duration-500 ease-in-out`}
                            />
                            <div
                                className={`absolute inset-0 rounded-full ${ringEffect ? 'scale-110 bg-blue-50' : 'scale-125 bg-transparent'} transition-all duration-500 ease-in-out`}
                            />

                            {/* Avatar người gọi */}
                            <div className='relative z-10 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md'>
                                <Image
                                    src={callerProfile?.profileImageUrl || placeholderImage}
                                    alt={callerProfile?.username || 'Caller'}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>

                        <h2 className='mt-4 text-center text-2xl font-bold text-gray-800'>Incoming Call</h2>
                        <p className='mt-1 text-center text-lg font-medium text-gray-700'>
                            {callerProfile?.username || 'User'}
                        </p>
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription />
                    </VisuallyHidden>
                </DialogHeader>

                <div className='mt-6 flex items-center justify-center gap-8'>
                    <Button
                        variant='icon'
                        size='icon'
                        onClick={rejectCall}
                        className='flex h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-lg transition-transform hover:bg-red-600 active:scale-95'
                    >
                        <Icon name='phone-x-mark' className='text-white' width={28} height={28} />
                    </Button>

                    <Button
                        variant='icon'
                        size='icon'
                        onClick={answerCall}
                        className='flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:bg-green-600 active:scale-95'
                    >
                        <Icon name='phone' className='text-white' width={28} height={28} />
                    </Button>
                </div>

                <div className='mt-4 flex justify-center gap-16 text-sm font-medium'>
                    <span className='text-center text-red-500'>Reject</span>
                    <span className='text-center text-green-500'>Accept</span>
                </div>
            </DialogContent>
        </Dialog>
    );
};

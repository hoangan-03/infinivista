'use client';

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
import {useGetProfileById} from '@/modules/profile/profile.swr';

export const ModalCallNotification: React.FC = () => {
    const {isReceivingCall, currentCallTargetId, answerCall, rejectCall} = useWebRTCContext();
    // TODO: currently only call from user is supported, need to add support for group call
    const {data: callerProfile} = useGetProfileById(currentCallTargetId || undefined);

    if (!isReceivingCall) return null;

    return (
        <Dialog open={isReceivingCall} onOpenChange={() => rejectCall()}>
            <DialogContent autoFocus={false} className='h-[20vh]'>
                <DialogHeader>
                    <DialogTitle className='text-center text-2xl font-bold'>
                        Incoming Call from <span className='w-[150px] truncate'>{callerProfile?.username}</span>
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription />
                    </VisuallyHidden>
                </DialogHeader>
                <div className='mt-8 flex items-center justify-center gap-16'>
                    <Button
                        variant='icon'
                        size='icon'
                        onClick={answerCall}
                        className='h-[72px] w-[72px] rounded-lg bg-green-500 hover:bg-green-600 active:scale-95'
                    >
                        <Icon name='phone' className='text-white' width={36} height={36} />
                    </Button>
                    <Button
                        variant='icon'
                        size='icon'
                        onClick={rejectCall}
                        className='h-[72px] w-[72px] rounded-lg bg-red-500 hover:bg-red-600 active:scale-95'
                    >
                        <Icon name='phone' className='text-white' width={36} height={36} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

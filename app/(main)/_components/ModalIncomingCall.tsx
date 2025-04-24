import {Avatar, Icon} from '@/components/commons';
import {Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui';

interface Props {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    onReject: () => void;
}

export const ModalIncomingCall: React.FC<Props> = ({open, onClose, onAccept, onReject}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='w-[400px] space-y-4'>
                <DialogHeader className='space-y-2'>
                    <div className='flex items-center gap-4'>
                        <div className='size-10'>
                            <Avatar />
                        </div>
                        <DialogTitle>Incoming Call from John</DialogTitle>
                    </div>
                    <DialogDescription />
                </DialogHeader>
                <div className='flex items-center justify-center gap-8'>
                    <Button
                        variant='none'
                        size='icon'
                        className='h-10 w-10 rounded-full bg-red-500 text-white'
                        onClick={() => {
                            onReject();
                            onClose();
                        }}
                    >
                        <Icon name='phone-x-mark' className='text-white' width={18} height={18} />
                    </Button>
                    <Button
                        variant='none'
                        size='icon'
                        className='h-10 w-10 rounded-full bg-green-500 text-white'
                        onClick={onAccept}
                    >
                        <Icon name='phone' className='text-white' width={18} height={18} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

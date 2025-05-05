import {ReactNode} from 'react';

import {Button, Dialog, DialogContent, DialogHeader, DialogTitle} from '../ui';

interface Props {
    open: boolean;
    title?: string;
    description?: string | ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}

export const ModalConfirm: React.FC<Props> = ({open, title, description, onClose, onConfirm}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent autoFocus={false} className='min-w-[400px] space-y-4'>
                <DialogHeader className='flex items-center space-y-2'>
                    <DialogTitle>{title || 'Confirm Action'}</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center space-y-4'>
                    {typeof description === 'string' || description === undefined ? (
                        <p className='text-sm font-semibold'>{description || 'Are you sure you want to proceed?'}</p>
                    ) : (
                        description
                    )}
                    <div className='flex gap-4'>
                        <Button variant='cancel' onClick={onClose} className='rounded-md'>
                            Cancel
                        </Button>
                        <Button onClick={onConfirm} className='rounded-md'>
                            Confirm
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

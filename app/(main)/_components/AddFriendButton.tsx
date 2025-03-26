import React from 'react';
import {cn} from '@/lib/utils';
import {UserPlus} from 'lucide-react';
import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';

interface AddFriendButtonProps {
    variant: 'full' | 'icon';
    onClick?: () => void;
    className?: string;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({variant, onClick, className}) => {
    return (
        // <button
        //     onClick={onClick}
        //     className={cn(
        //         'flex aspect-square h-fit items-center justify-center gap-2 rounded-lg border border-black bg-white text-black transition-all hover:bg-gray-300',
        //         variant === 'full' ? 'px-4 py-2' : 'p-2',
        //         className
        //     )}
        // >
        //     <Icon name='UserAdd' width={24} height={24} />
        //     {variant === 'full' && <p1>Add Friend</p1>}
        // </button>
        <Button
            className={cn('add-friend-button rounded-lg aspect-square p-1', className)}
            variant='outline'
            size='ssm'
            onClick={onClick}
        >
            <Icon name='UserAdd' width={24} height={24} />
            {variant === 'full' && <p1>Add Friend</p1>}
        </Button>
    );
};

export default AddFriendButton;

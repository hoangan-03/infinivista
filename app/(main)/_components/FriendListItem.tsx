import Image from 'next/image';
import React from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';

interface FriendListItemProps {
    username: string;
    name: string;
    profilePic: string;
    isOnline?: boolean;
    withMutualFriends?: boolean;
    mutualFriends?: number;
    withAddFriendButton?: boolean;
    onClick?: () => void;
    className?: string;
}

const FriendListItem: React.FC<FriendListItemProps> = ({
    username,
    name,
    profilePic,
    isOnline,
    withMutualFriends,
    mutualFriends = 0,
    withAddFriendButton,
    onClick,
    className,
}) => {
    return (
        <div
            className={cn(
                'friend-tag flex w-full cursor-pointer items-center justify-between gap-5 rounded-l-3xl rounded-r-lg p-1 hover:bg-gray-200',
                className
            )}
            onClick={onClick}
        >
            <div className='flex min-w-0 items-center gap-3'>
                <div className='relative h-fit w-fit min-w-10'>
                    <Image
                        src={profilePic}
                        alt={'Avatar of ' + username}
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    {isOnline && (
                        <div className='online-circle absolute bottom-0 right-0 box-border h-4 w-4 translate-x-[20%] translate-y-[20%] rounded-full border-[2px] bg-green-600' />
                    )}
                </div>
                <div className='flex min-w-0 flex-col gap-1'>
                    <p className='truncate text-subtitle2 font-bold text-gray-700'>{name}</p>
                    {withMutualFriends && (
                        <p className='truncate text-paragraph1 text-gray-400'>
                            {mutualFriends} mutual friend{mutualFriends !== 1 && 's'}
                        </p>
                    )}
                </div>
            </div>
            {withAddFriendButton && (
                <Button
                    aria-label='Add friend'
                    className='add-friend-button'
                    variant='outline'
                    size='square'
                    onClick={onClick}
                >
                    <Icon name='UserAdd' />
                </Button>
            )}
        </div>
    );
};

export default FriendListItem;

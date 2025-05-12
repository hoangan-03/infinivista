import Image from 'next/image';
import React from 'react';

import {cn} from '@/lib/utils';
import {IFriend} from '@/modules/friend/friend.interface';

interface FriendListItemProps {
    friend: IFriend;
    onViewProfile?: () => void;
    className?: string;
}

export const FriendListItem: React.FC<FriendListItemProps> = ({friend, onViewProfile, className}) => {
    return (
        <div
            className={cn(
                'friend-tag flex w-full cursor-pointer items-center justify-between gap-5 rounded-l-3xl rounded-r-lg p-1 hover:bg-gray-200',
                className
            )}
            onClick={onViewProfile}
        >
            <div className='flex min-w-0 items-center gap-3'>
                <div className='relative h-fit w-fit min-w-10'>
                    <Image
                        src={friend.profileImageUrl}
                        alt={'Avatar of ' + friend.username}
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    {/* {friend.isOnline && (
                        <div className='online-circle absolute bottom-0 right-0 box-border h-4 w-4 translate-x-[20%] translate-y-[20%] rounded-full border-[2px] bg-green-600' />
                    )} */}
                </div>
                <div className='flex min-w-0 flex-col gap-1'>
                    <p className='truncate text-subtitle2 font-bold text-gray-700'>{friend.username}</p>
                    {/* {friend.isMutualFriend && (
                        <p className='truncate text-paragraph1 text-gray-400'>
                            {friend.mutualFriends} mutual friend{friend.mutualFriends !== 1 && 's'}
                        </p>
                    )} */}
                </div>
            </div>
            {/* {friend.isAllowToAdd && (
                <Button
                    aria-label='Add friend'
                    className='aspect-square h-8 rounded-lg p-1'
                    variant='outline'
                    size='raw'
                    onClick={onAddFriend}
                >
                    <Icon name='user-add' />
                </Button>
            )} */}
        </div>
    );
};

'use client';

import {useRouter} from 'next/navigation';
import React from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Spinner} from '@/components/commons';
import {Badge, Input, ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfiniteFriends} from '@/modules/friend/friend.swr';
import {IProfile} from '@/modules/profile/profile.interface';

interface FriendsSectionProps {
    profile?: IProfile;
    className?: string;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({profile, className}) => {
    const router = useRouter();

    const {data: friends, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteFriends(profile?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: friends,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <div className={cn('rounded-3xl bg-white pb-5 pt-7 shadow-sm', className)}>
            <div className='w-52 border-b border-blue-600 pb-4'>
                <div className='flex items-center justify-between gap-6'>
                    <h2 className='ml-6 text-[28px] font-bold text-blue-600'>Friends</h2>
                    <Badge size='none' className='h-[20px] px-2'>
                        20/101
                    </Badge>
                </div>
            </div>
            <div className='p-3'>
                <Input variant='outline' placeholder='Find friends' className='text-paragraph1' />
                <ScrollArea className={'mt-6 h-[587px] pr-3'}>
                    {friends.map((friend, index) => (
                        <FriendListItem
                            key={friend.username}
                            data={friend}
                            className={cn('mb-4', index === friends.length - 1 && 'mb-0')}
                            onViewProfile={() => router.push(`/profile/${friend.id}`)}
                        />
                    ))}
                    <div ref={loadMoreRef} className='flex justify-center'>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

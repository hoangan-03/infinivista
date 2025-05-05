'use client';

import React from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Spinner} from '@/components/commons';
import {ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks/useInfiniteScrolling';
import {useGetInfiniteFriends} from '@/modules/friend/friend.swr';

export const Contacts: React.FC = () => {
    const {data: friends, pagination, size, setSize, isValidating, isLoading} = useGetInfiniteFriends();
    const {loadMoreRef} = useInfiniteScrolling({
        data: friends,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <ScrollArea className='h-[30vh] rounded-xl p-4 shadow-md'>
            <div className='space-y-4'>
                {friends.map((friend, index) => (
                    <FriendListItem key={index} data={friend} />
                ))}
            </div>

            <div ref={loadMoreRef} className='flex justify-center py-4'>
                {isValidating && !isLoading && <Spinner width={40} height={40} />}
            </div>
        </ScrollArea>
    );
};

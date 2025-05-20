'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Spinner} from '@/components/commons';
import {Input, ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfiniteFriends} from '@/modules/friend/friend.swr';
import {IProfile} from '@/modules/profile/profile.interface';

interface FriendsSectionProps {
    profile?: IProfile;
    className?: string;
    title?: string;
    viewAllLabel?: string;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({
    profile,
    className,
    title = 'Friends',
    viewAllLabel = 'View All Friends',
}) => {
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
        <div className={cn('rounded-3xl bg-white shadow-sm', className)}>
            <div className='flex flex-col gap-4 p-6'>
                <div className='flex flex-row items-center justify-between'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <Link href='#' className='text-sm font-medium text-primary hover:underline'>
                        {viewAllLabel}
                    </Link>
                </div>
                <Input variant='outline' placeholder='Find friends' className='text-paragraph1' />
                <ScrollArea className={'mt-6 h-[587px] pr-3'}>
                    {friends.map((friend, index) => (
                        <FriendListItem
                            key={friend.username}
                            friend={friend}
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

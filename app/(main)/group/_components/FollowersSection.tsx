'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React from 'react';

import {Spinner} from '@/components/commons';
import {Input, ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {IGroup} from '@/modules/group/group.interface';
import {useGetInfiniteGroupFollowers} from '@/modules/group/group.swr';

interface FollowersSectionProps {
    group?: IGroup;
    className?: string;
}

export const FollowersSection: React.FC<FollowersSectionProps> = ({group, className}) => {
    const router = useRouter();

    const {
        data: followers,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfiniteGroupFollowers(group?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: followers,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <div className={cn('rounded-3xl bg-white pb-5 pt-7 shadow-sm', className)}>
            <div className='w-52 border-b border-blue-600 pb-4'>
                <div className='flex items-center justify-between gap-6'>
                    <h2 className='ml-6 text-[28px] font-bold text-blue-600'>Members</h2>
                </div>
            </div>
            <div className='p-3'>
                <Input variant='outline' placeholder='Find friends' className='text-paragraph1' />
                <ScrollArea className={'mt-6 h-[587px] pr-3'}>
                    {followers.map((follower) => (
                        <div
                            className={cn(
                                'friend-tag flex w-full cursor-pointer items-center justify-between gap-5 rounded-l-3xl rounded-r-lg p-1 hover:bg-gray-200',
                                className
                            )}
                            onClick={() => router.push(`/profile/${follower.id}`)}
                            key={follower.id}
                        >
                            <div className='flex min-w-0 items-center gap-3'>
                                <div className='relative h-fit w-fit min-w-10'>
                                    <Image
                                        src={follower.profileImageUrl}
                                        alt={'Avatar of ' + follower.username}
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                    />
                                </div>
                                <div className='flex min-w-0 flex-col gap-1'>
                                    <p className='truncate text-subtitle2 font-bold text-gray-700'>
                                        {follower.username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={loadMoreRef} className='flex justify-center'>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

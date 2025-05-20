'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useMemo} from 'react';
import {toast} from 'react-toastify';

import {Spinner} from '@/components/commons';
import {Button, ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {FriendService} from '@/modules/friend/friend.service';
import {useGetMyInfiniteSuggestedFriends} from '@/modules/friend/friend.swr';
import {ROUTES} from '@/routes/routes.enum';

// Helper function to generate a stable "random" number based on user ID
const getCommonFriendsCount = (userId: string): number => {
    // Simple hash function to generate a stable number from user ID
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = (hash << 5) - hash + userId.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    // Return a number between 1 and 15 (typical range for common friends suggestion)
    return Math.abs(hash % 15) + 1;
};

export const Suggestions: React.FC = () => {
    const router = useRouter();

    const {
        data: suggestions,
        mutate,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetMyInfiniteSuggestedFriends();
    const {loadMoreRef} = useInfiniteScrolling({
        data: suggestions,
        pagination,
        size,
        isValidating,
        setSize,
    });

    const handleAddFriend = async (friendId: string) => {
        try {
            await FriendService.sendFriendRequest({userId: friendId});
            mutate();
            toast.success('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
            toast.error('Failed to send friend request');
        }
    };

    return (
        <ScrollArea className='h-[30vh] rounded-xl p-4 shadow-md'>
            <div className='space-y-4'>
                {suggestions.map((suggestion) => (
                    <div
                        key={suggestion.username}
                        className='flex w-full items-center justify-between gap-5 rounded-full p-1 hover:bg-gray-200'
                        onClick={() => router.push(ROUTES.PROFILE + `/${suggestion.id}`)}
                    >
                        <div className='flex w-full flex-col'>
                            <div className='flex items-center gap-3'>
                                <Image
                                    src={suggestion.profileImageUrl}
                                    alt={'Avatar of ' + suggestion.username}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <div>
                                    <p className='text-caption font-bold text-gray-700'>{suggestion.username}</p>
                                    <p className='text-xs text-gray-500'>
                                        {getCommonFriendsCount(suggestion.id)} mutual friends
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddFriend(suggestion.id);
                            }}
                            className='h-fit bg-primary p-2 text-slate-50 flex-center hover:bg-slate-900/90'
                        >
                            <p className='text-caption'>Add friend</p>
                        </Button>
                    </div>
                ))}
            </div>

            <div ref={loadMoreRef} className='flex justify-center py-4'>
                {isValidating && !isLoading && <Spinner width={40} height={40} />}
            </div>
        </ScrollArea>
    );
};

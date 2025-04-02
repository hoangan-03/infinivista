'use client';

import {useRouter} from 'next/navigation';
import React from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Button, Input, ScrollArea} from '@/components/ui';
import {cn} from '@/lib/utils';
import {FriendListType} from '@/mock_data/friendList';

interface FriendsSectionProps {
    friendList: FriendListType;
    className?: string;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({friendList, className}) => {
    const router = useRouter();
    const [query, setQuery] = React.useState<string>('');
    const [showAll, setShowAll] = React.useState<boolean>(false);

    // const friends = [
    //     'Alexandra Tan',
    //     'John Doe',
    //     'Jane Smith',
    //     'Michael Johnson',
    //     'Emily Davis',
    //     'Chris Brown',
    //     'Jessica Wilson',
    //     'David Martinez',
    //     'Sophia Garcia',
    //     'Daniel Rodriguez',
    // ];

    const filteredFriends = friendList.filter(
        (friend) =>
            // Return true if query is empty string, otherwise compare
            !query ||
            friend.name.toLowerCase().includes(query.toLowerCase()) ||
            friend.username.toLowerCase().includes(query.toLowerCase())
    );
    const displayedFriends = showAll ? filteredFriends : filteredFriends.slice(0, 2);

    return (
        <div className={cn('flex h-auto min-w-0 flex-col rounded-3xl bg-white shadow-md', className)}>
            <div className='h-12 w-52 flex-shrink-0 border-b-2 border-blue-600 py-3 pl-6'>
                <h2 className='text-2xl font-bold text-blue-600'>Friends</h2>
            </div>
            <div className='p-3'>
                <Input
                    variant='outline'
                    fontSize='text-paragraph1'
                    placeholder='Find friends'
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        console.log(query);
                    }}
                    className='search-input'
                />
            </div>
            <ScrollArea className='friends-scroll-area'>
                <div className='flex flex-col gap-4 px-6 pb-6'>
                    {displayedFriends.map((friend) => (
                        <FriendListItem
                            key={friend.username}
                            username={friend.username}
                            name={friend.name}
                            profilePic={friend.profilePic}
                            withMutualFriends
                            mutualFriends={friend.mutualFriends}
                            withAddFriendButton
                            onClick={() => router.push(`/profile/${friend.username}`)}
                        />
                    ))}
                </div>
            </ScrollArea>
            <Button variant='link' size='icon' onClick={() => setShowAll(!showAll)} className='mx-auto py-2'>
                <p className='text-base'>{!showAll ? 'See more' : 'See less'}</p>
            </Button>
        </div>
    );
};

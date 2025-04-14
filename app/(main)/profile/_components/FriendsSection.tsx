'use client';

import {useRouter} from 'next/navigation';
import React from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Badge, Button, Input, ScrollArea} from '@/components/ui';
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
        // flex h-auto min-w-0 flex-col
        <div className={cn('rounded-3xl bg-white pb-5 pt-7 shadow-md', className)}>
            <div className='w-52 border-b border-blue-600 pb-4'>
                <div className='flex items-center justify-between gap-6'>
                    <h2 className='ml-6 text-[28px] font-bold text-blue-600'>Friends</h2>
                    <Badge size='none' className='h-[20px] px-2'>
                        20/101
                    </Badge>
                </div>
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
                <ScrollArea className={cn('mt-6 pr-3', showAll ? 'h-[550px]' : 'h-fit')}>
                    {/* <div className='flex flex-col gap-4 pb-6'> */}
                    {displayedFriends.map((friend, index) => (
                        <FriendListItem
                            key={friend.username}
                            username={friend.username}
                            name={friend.name}
                            profilePic={friend.profilePic}
                            withMutualFriends
                            mutualFriends={friend.mutualFriends}
                            withAddFriendButton
                            className={cn('mb-4', index === displayedFriends.length - 1 && 'mb-0')}
                            onClick={() => router.push(`/profile/${friend.username}`)}
                        />
                    ))}
                    {/* <div>Hi</div> */}
                    {/* </div> */}
                </ScrollArea>
                <Button variant='link' size='icon' onClick={() => setShowAll(!showAll)} className='mx-auto py-2'>
                    <p className='text-base'>{!showAll ? 'See more' : 'See less'}</p>
                </Button>
            </div>
        </div>
    );
};

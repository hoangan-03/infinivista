'use client';

import {useRouter} from 'next/navigation';
import React, {useState} from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Badge, Button, Input, ScrollArea} from '@/components/ui';
import {cn} from '@/lib/utils';
import {Friend} from '@/mock_data/friend';

interface FriendsSectionProps {
    data: Friend[];
    className?: string;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({data, className}) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);

    const filteredFriends = data.filter(
        (friend) =>
            !query ||
            friend.name.toLowerCase().includes(query.toLowerCase()) ||
            friend.username.toLowerCase().includes(query.toLowerCase())
    );
    const displayedFriends = showAll ? filteredFriends.slice(0, 10) : filteredFriends.slice(0, 8);

    return (
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
                    placeholder='Find friends'
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    className='text-paragraph1'
                />
                <ScrollArea className={cn('mt-6 pr-3', showAll ? 'h-[550px]' : 'h-fit')}>
                    {displayedFriends.map((friend, index) => (
                        <FriendListItem
                            key={friend.username}
                            data={friend}
                            className={cn('mb-4', index === displayedFriends.length - 1 && 'mb-0')}
                            onViewProfile={() => router.push(`/profile/${friend.username}`)}
                        />
                    ))}
                </ScrollArea>
                <Button variant='link' size='icon' onClick={() => setShowAll(!showAll)} className='mx-auto py-2'>
                    <p className='text-base'>{!showAll ? 'See more' : 'See less'}</p>
                </Button>
            </div>
        </div>
    );
};

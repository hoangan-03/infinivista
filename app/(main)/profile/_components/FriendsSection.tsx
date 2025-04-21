'use client';

import {useRouter} from 'next/navigation';
import React, {useState} from 'react';

import {FriendListItem} from '@/app/(main)/_components';
import {Badge, Input, ScrollArea} from '@/components/ui';
import {cn} from '@/lib/utils';
import {IFriend} from '@/mock_data/friend';

interface FriendsSectionProps {
    data: IFriend[];
    className?: string;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({data, className}) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');

    const filteredFriends = data.filter(
        (friend) =>
            !query ||
            friend.name.toLowerCase().includes(query.toLowerCase()) ||
            friend.username.toLowerCase().includes(query.toLowerCase())
    );

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
                <Input
                    variant='outline'
                    placeholder='Find friends'
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    className='text-paragraph1'
                />
                <ScrollArea className={'mt-6 h-[587px] pr-3'}>
                    {filteredFriends.map((friend, index) => (
                        <FriendListItem
                            key={friend.username}
                            data={friend}
                            className={cn('mb-4', index === filteredFriends.length - 1 && 'mb-0')}
                            onViewProfile={() => router.push(`/profile/${friend.username}`)}
                        />
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
};

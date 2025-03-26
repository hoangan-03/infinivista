'use client';

import React from 'react';
import {cn} from '@/lib/utils';
import {useRouter} from 'next/navigation';

import {FriendListType} from '@/mock_data/friendList';
import FriendListItem from '../../_components/FriendListItem';

interface FriendsSectionProps {
    friendList: FriendListType;
    className?: string;
}

const FriendsSection: React.FC<FriendsSectionProps> = ({friendList, className}) => {
    const router = useRouter();
    const [showAll, setShowAll] = React.useState(false);

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

    const displayedFriends = showAll ? friendList : friendList.slice(0, 2);

    return (
        <div className={cn('flex h-auto min-w-0 flex-col rounded-3xl bg-white shadow-md', className)}>
            <div className='h-12 w-52 flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                <h2 className='text-2xl font-bold text-[#2563EB]'>Friends</h2>
            </div>
            <div className='flex flex-col gap-4 p-6'>
                {displayedFriends.map((friend) => (
                    // <li key={index} className='flex flex-row items-center'>
                    //     <Image
                    //         src='/assets/images/avatar.jpg'
                    //         alt='Avatar Icon'
                    //         width={40}
                    //         height={40}
                    //         className='rounded-full'
                    //         unoptimized={true}
                    //     />
                    //     <p className='ml-4 font-semibold text-gray-700'>{friend.name}</p>
                    // </li>
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
            {!showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className='mx-auto mb-4 text-base font-medium text-blue-700 hover:underline'
                >
                    Show more...
                </button>
            )}
        </div>
    );
};

export default FriendsSection;

'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const FriendsSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const friends = [
        'Alexandra Tan',
        'John Doe',
        'Jane Smith',
        'Michael Johnson',
        'Emily Davis',
        'Chris Brown',
        'Jessica Wilson',
        'David Martinez',
        'Sophia Garcia',
        'Daniel Rodriguez',
    ];

    const displayedFriends = showAll ? friends : friends.slice(0, 2);

    return (
        <div className='flex h-auto w-[382px] flex-col rounded-3xl bg-white shadow-md'>
            <div className='h-[50px] w-[200px] flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                <h2 className='text-2xl font-bold text-[#2563EB]'>Friends</h2>
            </div>
            <ul className='flex flex-col gap-4 p-6'>
                {displayedFriends.map((friend, index) => (
                    <li key={index} className='flex flex-row items-center'>
                        <Image
                            src='/assets/images/avatar.jpg'
                            alt='Avatar Icon'
                            width={40}
                            height={40}
                            className='rounded-full'
                            unoptimized={true}
                        />
                        <p className='ml-4 font-semibold text-gray-700'>{friend}</p>
                    </li>
                ))}
            </ul>
            {!showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className='mx-auto mb-4 text-blue-700 hover:underline font-medium text-base'
                >
                    Show more...
                </button>
            )}
        </div>
    );
};

export default FriendsSection;
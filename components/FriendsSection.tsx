/* eslint-disable @next/next/no-img-element */
import React from 'react';

const FriendsSection: React.FC = () => {
    return (
        <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-lg font-bold'>Friends</h3>
            <ul className='space-y-2'>
                <li className='flex items-center'>
                    <img
                        src='/friend-pic.jpg'
                        alt='Friend'
                        className='h-12 w-12 rounded-full border-2 border-gray-200'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Alexandra Tan</p>
                </li>
            </ul>
        </div>
    );
};

export default FriendsSection;

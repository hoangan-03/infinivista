/* eslint-disable @next/next/no-img-element */
import React from 'react';

const ProfileCard: React.FC = () => {
    return (
        <div className='flex h-[440px] flex-row items-center gap-10 rounded-lg shadow-md'>
            <div className='w-[770px] bg-white'>
                <img
                    src='/profile-pic.jpg'
                    alt='Profile Picture'
                    className='h-24 w-24 rounded-full border-2 border-blue-500'
                />
                <div className='ml-6'>
                    <h2 className='text-2xl font-bold'>John Nguyen</h2>
                    <p className='text-gray-500'>Lead Project Manager at NVIDIA</p>
                    <p className='text-gray-400'>Ho Chi Minh City, Vietnam</p>
                    <div className='mt-2 flex space-x-4'>
                        <span className='font-bold text-blue-500'>1924</span>
                        <span className='text-gray-500'>followers</span>
                        <span className='font-bold text-blue-500'>324</span>
                        <span className='text-gray-500'>connections</span>
                    </div>
                </div>
            </div>
            <div className='flex w-[320px] flex-col items-center bg-white'>
                <h2 className='text-2xl font-bold'>John Nguyen</h2>
                <p className='text-gray-500'>Lead Project Manager at NVIDIA</p>
                <p className='text-gray-400'>Ho Chi Minh City, Vietnam</p>
            </div>
        </div>
    );
};

export default ProfileCard;

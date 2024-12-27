import Image from 'next/image';
import React from 'react';

const FriendsSection: React.FC = () => {
    return (
        <div className='flex h-auto w-[382px] flex-col rounded-3xl bg-white shadow-md'>
            <div className='h-[50px] w-[200px] flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                <h2 className='text-2xl font-bold text-[#2563EB]'>Friends</h2>
            </div>
            <ul className='flex flex-col gap-4 p-6'>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Alexandra Tan</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>John Doe</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Jane Smith</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Michael Johnson</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Emily Davis</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Chris Brown</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Jessica Wilson</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>David Martinez</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Sophia Garcia</p>
                </li>
                <li className='flex flex-row items-center'>
                    <Image
                        src='/assets/images/avatar.jpg'
                        alt='Avatar Icon'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <p className='ml-4 font-semibold text-gray-700'>Daniel Rodriguez</p>
                </li>
            </ul>
        </div>
    );
};

export default FriendsSection;

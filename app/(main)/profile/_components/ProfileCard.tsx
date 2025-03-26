/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';

import {Button} from '@/components/ui/button';
import {UserDataType} from '@/mock_data/self';
import {Icon} from '@/components/commons';
import Image from 'next/image';
import AddFriendButton from '../../_components/AddFriendButton';

interface ProfileCardProps {
    userObject: UserDataType;
    isOwner: boolean;
    className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({userObject, isOwner, className}) => {
    const displayedJobTitle = userObject.introduction.jobTitles[userObject.details.displayedJobNo];

    return (
        <div className={cn('relative h-full rounded-3xl bg-white shadow-lg', className)}>
            <div className='relative h-52 w-full'>
                <Image
                    src={userObject.backgroundPic}
                    alt='Background Picture'
                    fill
                    objectFit='cover'
                    unoptimized={true}
                    className='rounded-tl-3xl rounded-tr-3xl'
                />
            </div>
            <div className='absolute left-6 top-36 h-32 w-32 rounded-full border-4 border-white bg-white'>
                <Image
                    src={userObject.profilePic}
                    alt='Avatar'
                    width={120}
                    height={120}
                    unoptimized={true}
                    className='rounded-full'
                />
            </div>
            <div className='relative flex h-56 flex-row justify-between px-4 py-6'>
                <div className='flex flex-col justify-between pl-4'>
                    <div className='flex flex-col gap-2 pt-12'>
                        <h2 className='text-2xl font-bold'>{userObject.name}</h2>
                        <p className='text-gray-500'>
                            {displayedJobTitle.job} at {displayedJobTitle.company}
                        </p>
                        <div className='flex flex-row gap-1'>
                            <Icon name='Work' width={24} height={24} />
                            <p className='text-gray-400'>
                                {userObject.introduction.city}, {userObject.introduction.country}
                            </p>
                        </div>
                    </div>

                    <div className='mt-2 flex flex-row gap-3'>
                        <div className='flex flex-row gap-1'>
                            <span className='font-bold text-blue-500'>{userObject.followerNumber}</span>
                            <span className='text-gray-500'>followers</span>
                        </div>
                        <div className='flex flex-row gap-1'>
                            <span className='font-bold text-blue-500'>{userObject.connectionNumber}</span>
                            <span className='text-gray-500'>connections</span>
                        </div>
                    </div>
                </div>

                <div className='ml-6 flex h-full flex-col items-end justify-between'>
                    {isOwner ? (
                        <div className='flex flex-row items-center justify-end gap-3'>
                            <Button variant='default'>Add to story</Button>
                            <Button variant='secondary'>Edit profile</Button>
                            <button>
                                <Icon name='More' width={24} height={24} />
                            </button>
                        </div>
                    ) : (
                        <div className='flex flex-row items-center justify-end gap-3'>
                            <AddFriendButton variant='full' />
                            <Button variant='secondary'>Message</Button>
                            <button>
                                <Icon name='More' width={24} height={24} />
                            </button>
                        </div>
                    )}
                </div>
                <div className='absolute bottom-4 right-8 flex flex-col gap-2'>
                    {[
                        {name: 'Facebook', link: userObject.socialLinks.facebook},
                        {name: 'Instagram', link: userObject.socialLinks.instagram},
                        {name: 'Tiktok', link: userObject.socialLinks.tiktok},
                        {name: 'LinkedIn', link: userObject.socialLinks.linkedin},
                    ].map((social) => (
                        <div key={social.name} className='flex flex-row items-center gap-3'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Icon name={social.name as any} width={24} height={24} />
                            </div>
                            <Link href={social.link}>
                                <h3 className='text-base text-black'>{social.link.split('/').pop()}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

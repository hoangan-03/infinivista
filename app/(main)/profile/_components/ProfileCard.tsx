/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {userDataType} from '@/mock_data/self';

interface ProfileCardProps {
    userObject: userDataType;
}

const ProfileCard: React.FC<ProfileCardProps> = ({userObject}) => {
    const displayedJobTitle = userObject.introduction.jobTitles[userObject.details.displayedJobNo];

    return (
        <div className='w-fill flex h-[440px] flex-row items-center gap-4'>
            <div className='relative h-full w-[770px] rounded-3xl bg-white shadow-lg'>
                <Image
                    src={userObject.backgroundPic}
                    alt='Background Picture'
                    width={770}
                    height={210}
                    unoptimized={true}
                    className='h-[210px] w-full rounded-tl-3xl rounded-tr-3xl'
                />
                <div className='absolute left-6 top-[150px] h-[120px] w-[120px] rounded-full border-4 border-white bg-white'>
                    <Image
                        src={userObject.profilePic}
                        alt='Avatar'
                        width={120}
                        height={120}
                        className='rounded-full'
                        unoptimized={true}
                    />
                </div>
                <div className='flex h-[230px] flex-row justify-between px-4 py-6'>
                    <div className='flex flex-col justify-between pl-4'>
                        <div className='flex flex-col gap-2 pt-12'>
                            <h2 className='text-2xl font-bold'>{userObject.name}</h2>
                            <p className='text-gray-500'>
                                {displayedJobTitle.job} at {displayedJobTitle.company}
                            </p>
                            <div className='flex flex-row gap-1'>
                                <Image
                                    src='/assets/icons/vietnam.png'
                                    alt='Profile Picture'
                                    width={25}
                                    height={25}
                                    unoptimized={true}
                                />
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
                        <div className='flex flex-row items-center justify-end gap-3'>
                            <Button variant='default'>Add to story</Button>
                            <Button variant='secondary'>Edit profile</Button>
                            <Image
                                src='/assets/icons/three_dots.png'
                                alt='Facebook Icon'
                                width={24}
                                height={24}
                                className='h-[24px] w-[24px]'
                                unoptimized={true}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image
                                        src='/assets/icons/facebook.png'
                                        alt='Facebook Icon'
                                        width={24}
                                        height={24}
                                        unoptimized={true}
                                    />
                                </div>
                                <Link href={userObject.socialLinks.facebook}>
                                    {' '}
                                    <h3 className='text-base text-black'>
                                        {userObject.socialLinks.facebook.split('/').pop()}
                                    </h3>
                                </Link>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image
                                        src='/assets/icons/instagram.png'
                                        alt='instagram Icon'
                                        width={24}
                                        height={24}
                                        unoptimized={true}
                                    />
                                </div>
                                <Link href={userObject.socialLinks.instagram}>
                                    {' '}
                                    <h3 className='text-base text-black'>
                                        {userObject.socialLinks.instagram.split('/').pop()}
                                    </h3>
                                </Link>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image src='/assets/icons/tiktok.png' alt='tiktok Icon' width={20} height={24} />
                                </div>
                                <Link href={userObject.socialLinks.tiktok}>
                                    {' '}
                                    <h3 className='text-base text-black'>
                                        {userObject.socialLinks.tiktok.split('/').pop()}
                                    </h3>
                                </Link>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image
                                        src='/assets/icons/linkedln.png'
                                        alt='linkedln Icon'
                                        width={24}
                                        height={24}
                                        unoptimized={true}
                                    />
                                </div>
                                <Link href={userObject.socialLinks.linkedin}>
                                    {' '}
                                    <h3 className='text-base text-black'>
                                        {userObject.socialLinks.linkedin.split('/').pop()}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex h-full w-[320px] flex-col items-start rounded-3xl bg-white shadow-lg'>
                <div className='h-auto w-[200px] border-b-2 border-[#2563EB] py-3 pl-6'>
                    <h2 className='text-2xl font-bold text-[#2563EB]'>Introduction</h2>
                </div>
                <div className='flex h-full w-full flex-col items-start justify-start gap-4 px-6 py-3'>
                    {userObject.introduction.jobTitles.map((jobTitle, idx) => (
                        <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Image
                                    src='/assets/icons/work.png'
                                    alt='Work Icon'
                                    width={20}
                                    height={18}
                                    unoptimized={true}
                                />
                            </div>
                            <h2 className='text-base font-medium'>
                                {jobTitle.job} at {jobTitle.company}
                            </h2>
                        </div>
                    ))}

                    {userObject.introduction.academic.map((school, idx) => (
                        <div key={idx} className='flex flex-row items-center justify-center gap-2'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Image
                                    src='/assets/icons/study.png'
                                    alt='Study Icon'
                                    width={21}
                                    height={19}
                                    unoptimized={true}
                                />
                            </div>
                            <h2 className='text-base font-medium'>Went to {school}</h2>
                        </div>
                    ))}

                    {userObject.introduction.city && (
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Image
                                    src='/assets/icons/home.png'
                                    alt='Home Icon'
                                    width={22}
                                    height={20}
                                    unoptimized={true}
                                />
                            </div>
                            <h2 className='text-base font-medium'>Lives in {userObject.introduction.city}</h2>
                        </div>
                    )}

                    {userObject.introduction.hometown && (
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Image
                                    src='/assets/icons/locate.png'
                                    alt='Hometown Icon'
                                    width={14}
                                    height={20}
                                    unoptimized={true}
                                />
                            </div>
                            <h2 className='text-base font-medium'>Comes from {userObject.introduction.hometown}</h2>
                        </div>
                    )}

                    {userObject.introduction.marritalStatus && (
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className='flex h-6 w-6 items-center justify-center'>
                                <Image
                                    src='/assets/icons/love.png'
                                    alt='Single Icon'
                                    width={20}
                                    height={20}
                                    unoptimized={true}
                                />
                            </div>
                            <h2 className='text-base font-medium'>{userObject.introduction.marritalStatus}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

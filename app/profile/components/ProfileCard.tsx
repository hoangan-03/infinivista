/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

import {Button} from '../ui/button';

const ProfileCard: React.FC = () => {
    return (
        <div className='flex h-[440px] w-[1110px] flex-row items-center gap-4'>
            <div className='h-full w-[770px] rounded-3xl bg-white shadow-lg'>
                <Image
                    src='/assets/images/back_image.png'
                    alt='Profile Picture'
                    width={770}
                    height={210}
                    className='h-[210px] w-full rounded-tl-3xl rounded-tr-3xl'
                />
                <div className='flex h-[230px] flex-row justify-between px-4 py-6'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>John Nguyen</h2>
                            <p className='text-gray-500'>Lead Project Manager at NVIDIA</p>
                            <div className='flex flex-row gap-1'>
                                <Image src='/assets/icons/vietnam.png' alt='Profile Picture' width={25} height={25} />
                                <p className='text-gray-400'>Ho Chi Minh City, Vietnam</p>
                            </div>
                        </div>

                        <div className='mt-2 flex flex-row gap-3'>
                            <div className='flex flex-row gap-1'>
                                <span className='font-bold text-blue-500'>1924</span>
                                <span className='text-gray-500'>followers</span>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <span className='font-bold text-blue-500'>324</span>
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
                                    />
                                </div>
                                <h3 className='text-md text-black'>john-nguyen-03</h3>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image
                                        src='/assets/icons/instagram.png'
                                        alt='instagram Icon'
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <h3 className='text-md text-black'>john-nguyen-03</h3>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image src='/assets/icons/tiktok.png' alt='tiktok Icon' width={20} height={24} />
                                </div>
                                <h3 className='text-md text-black'>john.nguyen6363</h3>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <div className='flex h-6 w-6 items-center justify-center'>
                                    <Image
                                        src='/assets/icons/linkedln.png'
                                        alt='linkedln Icon'
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <h3 className='text-md text-black'>john-ng-03</h3>
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
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/work.png' alt='Work Icon' width={20} height={18} />
                        </div>
                        <h2 className='text-base font-medium'>CTO at VNG</h2>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/work.png' alt='Work Icon' width={20} height={18} />
                        </div>
                        <h2 className='text-base font-medium'>PM at FPT Software</h2>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/study.png' alt='Study Icon' width={21} height={19} />
                        </div>
                        <h2 className='text-base font-medium'>Went to Oxford International</h2>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/home.png' alt='Home Icon' width={22} height={20} />
                        </div>
                        <h2 className='text-base font-medium'>Lives in Ho Chi Minh City</h2>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/locate.png' alt='Hometown Icon' width={14} height={20} />
                        </div>
                        <h2 className='text-base font-medium'>Comes from Dong Nai</h2>
                    </div>

                    <div className='flex flex-row items-center justify-center gap-2'>
                        <div className='flex h-6 w-6 items-center justify-center'>
                            <Image src='/assets/icons/love.png' alt='Single Icon' width={20} height={20} />
                        </div>
                        <h2 className='text-base font-medium'>Single</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

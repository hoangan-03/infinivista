import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {Icon} from '@/components/commons';
import {Button} from '@/components/ui/button';
import {useGetProfileInfo} from '@/hooks';
import {cn} from '@/lib/utils';
import {SOCIAL_LINK_TYPE} from '@/modules/common.enum';
import {IProfile} from '@/modules/profile/profile.interface';
import {useGetProfileSocialLinks} from '@/modules/profile/profile.swr';

type IconName = {
    name: string;
    type: SOCIAL_LINK_TYPE;
};

const icons: IconName[] = Object.values(SOCIAL_LINK_TYPE).map((type) => ({
    name: `${type.toLowerCase()}-outline`,
    type,
}));

interface ProfileCardProps {
    profile?: IProfile;
    className?: string;
}

// Generate stable follower/following counts based on the profile ID
const getStableCounts = (profileId?: string) => {
    if (!profileId) return {followers: 100, following: 50};

    // Use the profile ID to generate deterministic numbers
    const numericValue = profileId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return {
        followers: 100 + (numericValue % 900), // Range: 100-999
        following: 50 + (numericValue % 150), // Range: 50-199
    };
};

export const ProfileCard: React.FC<ProfileCardProps> = ({profile, className}) => {
    const {userId: currentUserId} = useGetProfileInfo();
    const isOwner = currentUserId === profile?.id;

    const {data: socialLinks} = useGetProfileSocialLinks(profile?.id);
    const {followers, following} = getStableCounts(profile?.id);

    return (
        <div className={cn('relative h-full rounded-3xl bg-white shadow-sm', className)}>
            <div className='relative h-52 w-full'>
                <Image
                    src={profile?.coverImageUrl || '/assets/images/back_image.png'}
                    alt='Background Picture'
                    fill
                    unoptimized={true}
                    className='rounded-tl-3xl rounded-tr-3xl object-cover'
                />
            </div>
            <div className='absolute left-6 top-36 h-32 w-32 rounded-full border-4 border-white bg-white'>
                <Image
                    src={profile?.profileImageUrl || '/assets/images/avatar.jpg'}
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
                        <h2 className='text-2xl font-bold'>{profile?.username}</h2>
                        <div className='flex flex-row gap-1'>
                            <Icon name='work' />
                            <p className='text-gray-400'>{profile?.address}</p>
                        </div>
                    </div>

                    <div className='mt-2 flex flex-row gap-3'>
                        <div className='flex flex-row gap-1'>
                            <span className='font-bold text-blue-500'>{followers}</span>
                            <span className='text-gray-500'>Followers</span>
                        </div>
                        <div className='flex flex-row gap-1'>
                            <span className='font-bold text-blue-500'>{following}</span>
                            <span className='text-gray-500'>Following</span>
                        </div>
                    </div>
                </div>

                <div className='ml-6 flex h-full flex-col items-end justify-between'>
                    {isOwner ? (
                        <div className='flex flex-row items-center justify-end gap-3'>
                            <Button variant='secondary'>Add to story</Button>
                            <Button variant='secondary'>Edit profile</Button>
                            {/* <Button variant='icon' size='icon'>
                                <Icon name='more' />
                            </Button> */}
                        </div>
                    ) : (
                        <div className='flex flex-row items-center justify-end gap-3'>
                            <Button className='group border-2 border-primary bg-white text-primary flex-center hover:bg-primary hover:text-white'>
                                <Icon name='user-add' className='group-hover:text-white' />
                                Add friend
                            </Button>
                            <Button variant='secondary'>Message</Button>
                            <Button variant='icon' size='icon'>
                                <Icon name='more' />
                            </Button>
                        </div>
                    )}
                </div>
                <div className='absolute bottom-4 right-8 flex flex-col gap-2'>
                    {socialLinks
                        ?.filter(
                            (social) => social.type !== 'YOUTUBE' && social.type !== 'TELEGRAM' && social.type !== 'X'
                        )
                        .map((social) => {
                            const icon = icons.find((icon) => icon.type === social.type);

                            return (
                                <div key={social.type} className='flex flex-row items-center gap-3'>
                                    <div className='flex h-6 w-6 items-center justify-center'>
                                        <Icon name={icon?.name || `${social.type.toLowerCase()}-outline`} />
                                    </div>
                                    <Link href={social.link}>
                                        <h3 className='text-base text-black hover:underline'>
                                            {social.link.split('/').pop()}
                                        </h3>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

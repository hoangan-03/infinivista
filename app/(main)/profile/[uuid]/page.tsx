'use client';

import React from 'react';

import {useGetProfileById} from '@/modules/profile/profile.swr';

import {AboutSection, FriendsSection, IntroductionSection, PostsSection, ProfileCard} from '../_components';

const ProfilePage: React.FC<{params: {uuid: string}}> = ({params}) => {
    const {data: profile} = useGetProfileById(params.uuid);

    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            <div className='flex flex-col px-6 pt-6'>
                <div className='mb-6 flex h-[27.5rem] items-center gap-4'>
                    <ProfileCard profile={profile} className='flex-2' />
                    <IntroductionSection profile={profile} className='flex-1' />
                </div>

                <AboutSection profile={profile} />

                <div className='flex gap-4 py-6'>
                    <FriendsSection profile={profile} className='flex-1 self-start' />
                    <PostsSection profile={profile} className='flex-3' />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

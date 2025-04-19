import {notFound} from 'next/navigation';
import React from 'react';

import {friends} from '@/mock_data/friend';
import {posts} from '@/mock_data/post';
import {Profile, profile as mockProfile} from '@/mock_data/profile';

import {AboutSection, FriendsSection, IntroductionSection, PostsSection, ProfileCard} from '../_components';

const ProfilePage: React.FC<{params: {uuid: string}}> = ({params}) => {
    // TODO: Use uuid to get user data from the server --> if not found, return notFound()
    const profile: Profile = params ? mockProfile : mockProfile;

    if (!profile) {
        return notFound();
    }

    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            <div className='flex flex-col px-6 pt-6'>
                <div className='mb-6 flex h-[27.5rem] items-center gap-4'>
                    <ProfileCard data={profile} isOwner={true} className='flex-2' />
                    <IntroductionSection data={profile} className='flex-1' />
                </div>

                <AboutSection text={profile.bio} />

                <div className='flex gap-4 py-6'>
                    <FriendsSection data={friends} className='flex-1 self-start' />
                    <PostsSection data={posts} className='flex-3' />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

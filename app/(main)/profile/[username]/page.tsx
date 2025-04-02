import {notFound} from 'next/navigation';
import React from 'react';

import friendList from '@/mock_data/friendList';
import postList from '@/mock_data/postMockData';
import currentUser from '@/mock_data/self';
import otherUsers from '@/mock_data/userMockData';

import {AboutSection, FriendsSection, IntroductionSection, PostsSection, ProfileCard} from '../_components';
// import Header from '@/components/commons/Header';

const UserProfile: React.FC<{params: {username: string}}> = ({params}) => {
    // display current user profile if the username is the same as the current user, otherwise display the matched user profile
    const isOwner = currentUser.username === params.username;
    const displayedUser = isOwner ? currentUser : otherUsers.find((user) => user.username === params.username);

    if (!displayedUser) {
        return notFound();
    }

    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            {/* <Header /> */}
            <div className='flex flex-col px-6 pt-6'>
                <div className='mb-6 flex h-[27.5rem] items-center gap-4'>
                    <ProfileCard userObject={displayedUser} isOwner={isOwner} className='flex-2' />
                    <IntroductionSection userObject={displayedUser} className='flex-1' />
                </div>

                <AboutSection text={displayedUser.about} />

                <div className='flex h-screen gap-4 py-6'>
                    <FriendsSection friendList={friendList} className='flex-1' />
                    <PostsSection postList={postList} className='flex-3' />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

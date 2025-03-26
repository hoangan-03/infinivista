import React from 'react';
import {notFound} from 'next/navigation';

import AboutSection from '../_components/AboutSection';
import FriendsSection from '../_components/FriendsSection';
// import Header from '@/components/commons/Header';
import PostsSection from '../_components/PostsSection';
import ProfileCard from '../_components/ProfileCard';

import currentUser from '@/mock_data/self';
import otherUsers from '@/mock_data/userMockData';
import friendList from '@/mock_data/friendList';
import postList from '@/mock_data/postMockData';
import IntroductionSection from '../_components/IntroductionSection';

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
            <div className='flex flex-col space-y-6 p-6'>
                <div className='w-fill flex h-[440px] items-center gap-4'>
                    <ProfileCard userObject={displayedUser} />
                    <IntroductionSection userObject={displayedUser} />
                </div>
                
                <AboutSection text={displayedUser.about} />

                <div className='flex gap-4'>
                    <FriendsSection friendList={friendList} className='flex-1' />
                    <PostsSection postList={postList} className='flex-3' />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

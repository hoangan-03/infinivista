import React from 'react';

import AboutSection from '../_components/AboutSection';
import FriendsSection from '../_components/FriendsSection';
// import Header from '@/components/commons/Header';
import PostsSection from '../_components/PostsSection';
import ProfileCard from '../_components/ProfileCard';

import currentUser from '../../_mock_data/self';
import otherUsers from '../../_mock_data/userMockData';

const Home: React.FC = () => {
    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            {/* <Header /> */}
            <div className='flex flex-1'>
                <div className='w-full flex-1 flex-col space-y-6 p-6'>
                    <ProfileCard userObject={currentUser} />
                    <AboutSection />

                    <div className='flex w-full flex-row gap-4'>
                        <FriendsSection />
                        <PostsSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

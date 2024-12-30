// import {Icon} from '@/components/commons';

// export default function Home() {
//     return (
//         <div>
//             <h1 className='text-display1'>Infinivista</h1>
//             <Icon name='Search' width={200} height={200} />
//         </div>
//     );
// }

import React from 'react';

import AboutSection from './components/AboutSection';
import FriendsSection from './components/FriendsSection';
import Header from './components/Header';
import PostsSection from './components/PostsSection';
import ProfileCard from './components/ProfileCard';
import Sidebar from './components/Sidebar';

const Home: React.FC = () => {
    return (
        <div className='flex min-h-screen flex-col bg-gray-100'>
            <Header />
            <div className='flex flex-1'>
                <Sidebar />
                <div className='flex-1 flex-col space-y-6 p-6'>
                    <ProfileCard />
                    <AboutSection />
                    
                    <div className='flex flex-row gap-4 w-full'>
                    <FriendsSection />
                    <PostsSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

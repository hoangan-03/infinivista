import React from 'react';

import {Post} from '@/app/(main)/_components';
import postMockData from '@/mock_data/postMockData';

const ConnectFeedFollowing = () => {
    return (
        <div className='flex flex-col gap-7'>
            {postMockData.map((post) => (
                <Post key={post.id} postObject={post} />
            ))}
        </div>
    );
};

export default ConnectFeedFollowing;

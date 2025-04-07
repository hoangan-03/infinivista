import React from 'react';

import {Post} from '@/app/(main)/_components';
import postList from '@/mock_data/postMockData';

const ConnectFeedForYou = () => {
    return (
        <div className='flex flex-col gap-7'>
            {postList.map((post) => (
                <Post key={post.id} postObject={post} />
            ))}
        </div>
    );
};

export default ConnectFeedForYou;

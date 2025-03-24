import React from 'react';
import Post from '@/app/(main)/_components/Post';
import _ from 'lodash';

import PostObj from '@/app/(main)/_mock_data/postMockData';

const Connect_Feed_ForYou = () => {
    return (
        // <div className='h-[calc(100vh-4.125rem)] px-10 -mx-10 py-5 -my-5 flex flex-col gap-7 overflow-auto'>
        <div className='flex flex-col gap-7'>
            <Post postObj={_.cloneDeep(PostObj)} />
            <Post postObj={_.cloneDeep(PostObj)} />
            <Post postObj={_.cloneDeep(PostObj)} />
        </div>
    );
};

export default Connect_Feed_ForYou;

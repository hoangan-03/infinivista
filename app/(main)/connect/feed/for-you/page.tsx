import React from 'react';

import {Post} from '@/app/(main)/_components';
// import _ from 'lodash';
import postList from '@/mock_data/postMockData';

const Connect_Feed_ForYou = () => {
    return (
        // <div className='h-[calc(100vh-4.125rem)] px-10 -mx-10 py-5 -my-5 flex flex-col gap-7 overflow-auto'>
        <div className='post-list flex flex-col gap-7'>
            {/* <Post postObject={_.cloneDeep(postObject)} />
            <Post postObject={_.cloneDeep(postObject)} />
            <Post postObject={_.cloneDeep(postObject)} /> */}
            {postList.map((post) => (
                <Post key={post.id} postObject={post} />
            ))}
        </div>
    );
};

export default Connect_Feed_ForYou;

import {ArrowRightIcon} from '@heroicons/react/solid';
import React from 'react';

import PostObj from '@/app/(main)/profile/mock_data/postMockData';

import {Button} from '../ui';
import Post from './Post';
const PostsSection: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-4'>
            <div className='flex flex-row gap-3'>
                <Button variant='default'>Post</Button>
                <Button variant='secondary'>Photos</Button>
                <Button variant='secondary'>Videos</Button>
                <Button variant='iconAfterShadow' size='default'>
                    More
                    <ArrowRightIcon className='h-4 w-4' />
                </Button>
            </div>

            <div className='flex h-auto w-full flex-col rounded-3xl bg-white shadow-md'>
                <div className='h-[50px] w-[200px] flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                    <h2 className='text-2xl font-bold text-[#2563EB]'>Posts</h2>
                </div>
                <div>
                    <Post postObj={PostObj} />
                </div>
            </div>
        </div>
    );
};

export default PostsSection;

import {ArrowRightIcon} from '@heroicons/react/solid';
import React from 'react';

import {Post} from '@/app/(main)/_components';
import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';
import {PostObjectType} from '@/mock_data/postMockData';

interface PostsSectionProps {
    postList: PostObjectType[];
    className?: string;
}

export const PostsSection: React.FC<PostsSectionProps> = ({postList, className}) => {
    return (
        <div className={cn('flex min-w-0 flex-col gap-4', className)}>
            <div className='flex flex-row gap-3'>
                <Button variant='default'>Post</Button>
                <Button variant='secondary'>Photos</Button>
                <Button variant='secondary'>Videos</Button>
                <Button variant='iconShadow' size='default'>
                    More
                    <ArrowRightIcon className='h-4 w-4' />
                </Button>
            </div>

            <div className='flex h-auto w-full flex-col rounded-3xl bg-white'>
                <div className='h-12 w-52 flex-shrink-0 border-b-2 border-[#2563EB] py-3 pl-6'>
                    <h2 className='text-2xl font-bold text-[#2563EB]'>Posts</h2>
                </div>
                <div className='post-list flex flex-col gap-7 px-7 pt-7'>
                    {postList.map((post) => (
                        <Post key={post.id} postObject={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

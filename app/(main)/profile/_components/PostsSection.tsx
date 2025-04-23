'use client';

import {ArrowRightIcon} from '@heroicons/react/solid';
import React, {useState} from 'react';

import {ModalNewPost, Post} from '@/app/(main)/_components';
import {Icon} from '@/components/commons';
import {Button, ScrollArea} from '@/components/ui';
import {cn} from '@/lib/utils';
import {IPost} from '@/mock_data/post';
import {profile} from '@/mock_data/profile';

interface PostsSectionProps {
    data: IPost[];
    className?: string;
}

export const PostsSection: React.FC<PostsSectionProps> = ({data, className}) => {
    const [showModalNewPost, setShowModalNewPost] = useState<boolean>(false);

    return (
        <div className={cn('space-y-4', className)}>
            <div className='flex flex-row gap-3'>
                <Button variant='default' className='w-[120px]'>
                    Post
                </Button>
                <Button variant='secondary' className='w-[120px]'>
                    Photos
                </Button>
                <Button variant='secondary' className='w-[120px]'>
                    Videos
                </Button>
                <Button
                    size='default'
                    className='w-[120px] bg-white text-slate-900 shadow-md flex-center hover:shadow-lg'
                >
                    More
                    <ArrowRightIcon className='h-4 w-4' />
                </Button>
            </div>
            <div className='rounded-3xl bg-white pt-7 shadow-sm'>
                <div className='flex items-center justify-between pr-5'>
                    <div className='w-52 border-b border-blue-600 pb-4'>
                        <h2 className='ml-9 text-[28px] font-bold text-blue-600'>Posts</h2>
                    </div>
                    <div className='flex gap-3'>
                        <Button
                            variant='raw'
                            size='raw'
                            className='inline-flex w-fit items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                            onClick={() => setShowModalNewPost(true)}
                        >
                            <Icon name='upload' />
                            Post
                        </Button>
                        <Button
                            variant='raw'
                            size='raw'
                            className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                        >
                            <Icon name='settings-burger' />
                            Filter
                        </Button>
                        <Button
                            variant='raw'
                            size='raw'
                            className='inline-flex items-center justify-center gap-2 rounded-[12px] border border-black px-5 py-[6px] font-bold hover:bg-slate-100'
                        >
                            <Icon name='settings-gear' />
                            Manage Posts
                        </Button>
                    </div>
                </div>
                <ScrollArea className='h-[650px]'>
                    <div className='space-y-7 p-7'>
                        {data.map((post) => (
                            <Post key={post.id} data={post} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <ModalNewPost open={showModalNewPost} onClose={() => setShowModalNewPost(false)} data={profile} />
        </div>
    );
};

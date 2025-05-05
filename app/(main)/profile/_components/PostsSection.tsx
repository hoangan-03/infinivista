'use client';

import {ArrowRightIcon} from '@heroicons/react/solid';
import React, {useState} from 'react';

import {ModalNewPost, Post} from '@/app/(main)/_components';
import {Icon, Spinner} from '@/components/commons';
import {Button, ScrollArea} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetNewsFeedByUserId} from '@/modules/feed/feed.swr';
import {useGetInfinitePosts} from '@/modules/post/post.swr';
import {IProfile} from '@/modules/profile/profile.interface';

interface PostsSectionProps {
    profile?: IProfile;
    className?: string;
}

export const PostsSection: React.FC<PostsSectionProps> = ({profile, className}) => {
    const [showModalNewPost, setShowModalNewPost] = useState<boolean>(false);

    const {data: newsFeed} = useGetNewsFeedByUserId(profile?.id);
    console.log('newsFeed', newsFeed);

    const {data: posts, pagination, size, setSize, isValidating, isLoading} = useGetInfinitePosts(newsFeed?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: posts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    const {userId: currentUserId} = useGetProfileInfo();

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
                    {profile?.id === currentUserId && (
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
                    )}
                </div>
                <ScrollArea className='h-[650px]'>
                    <div className='space-y-7 p-7'>
                        {posts.map((post) => (
                            <Post key={post.id} post={post} isShared={post.userOwner.id !== profile?.id} />
                        ))}
                    </div>
                    <div ref={loadMoreRef} className={cn('flex justify-center', isValidating && !isLoading && 'py-8')}>
                        {isValidating && !isLoading && <Spinner width={60} height={60} />}
                    </div>
                    {!isValidating &&
                        posts.length > 0 &&
                        pagination.length > 0 &&
                        pagination[pagination.length - 1]?.page === pagination[pagination.length - 1]?.totalPages && (
                            <div className='py-5 text-center text-gray-500'>No more posts to load 😢</div>
                        )}
                </ScrollArea>
            </div>
            {profile?.id === currentUserId && (
                <ModalNewPost
                    open={showModalNewPost}
                    onClose={() => setShowModalNewPost(false)}
                    data={profile || undefined}
                />
            )}
        </div>
    );
};

'use client';

import React from 'react';

import {Post} from '@/app/(main)/_components';
import {Spinner} from '@/components/commons';
import {ScrollArea} from '@/components/ui';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {IPage} from '@/modules/page/page.interface';
import {useGetInfinitePagePosts} from '@/modules/page/page.swr';

interface MainSectionProps {
    page?: IPage;
    className?: string;
}

export const MainSection: React.FC<MainSectionProps> = ({page, className}) => {
    const {data: posts, pagination, size, setSize, isValidating, isLoading} = useGetInfinitePagePosts(page?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: posts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <div className={cn('space-y-4', className)}>
            <div className='rounded-3xl bg-white pt-7 shadow-sm'>
                <div className='flex items-center justify-between pr-5'>
                    <div className='w-52 border-b border-blue-600 pb-4'>
                        <h2 className='ml-9 text-[28px] font-bold text-blue-600'>Posts</h2>
                    </div>
                </div>
                <ScrollArea className='relative h-[650px]'>
                    {isLoading && (
                        <div className='my-10 flex items-center justify-center'>
                            <Spinner width={60} height={60} />
                        </div>
                    )}
                    <div className='space-y-7 p-7'>
                        {posts.map((post) => (
                            <Post key={post.id} post={post} isShared={false} />
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
        </div>
    );
};

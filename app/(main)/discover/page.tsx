'use client';

import {Icon, Spinner} from '@/components/commons';
import {Input} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetInfinitePosts} from '@/modules/post/post.swr';

import {Post} from '../_components';

function DiscoverPage() {
    const {userId} = useGetProfileInfo();

    const {
        data: posts,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfinitePosts(undefined, 'discover');
    const {loadMoreRef} = useInfiniteScrolling({
        data: posts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <div className='relative flex justify-center px-10 py-4'>
            <div className='w-4/5'>
                <div className='sticky top-0 z-20 flex h-[3.875rem] w-full items-center justify-between bg-white pb-10 pt-8'>
                    <h5 className='font-extrabold text-blue-700'>Discover</h5>
                    <div className='w-4/5'>
                        <Input
                            placeholder='Search'
                            prefixIcon={<Icon name='search' />}
                            className='border border-slate-300'
                        />
                    </div>
                </div>
                <div className='space-y-7 px-4'>
                    {posts.map((post) => (
                        <Post key={post.id} data={post} isShared={post.userOwner.id !== userId} />
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
            </div>
        </div>
    );
}

export default DiscoverPage;

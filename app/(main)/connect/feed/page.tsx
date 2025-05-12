'use client';

import {useEffect} from 'react';

import {Post} from '@/app/(main)/_components';
import {Spinner} from '@/components/commons';
import {useFeedContext} from '@/context';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {useGetInfinitePosts} from '@/modules/post/post.swr';

function FeedPage() {
    const {feedType, newsFeed} = useFeedContext();
    const {userId} = useGetProfileInfo();

    const {
        data: posts,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfinitePosts(newsFeed?.id, feedType);
    const {loadMoreRef} = useInfiniteScrolling({
        data: posts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    useEffect(() => {
        setSize(1);
    }, [feedType, setSize]);

    return (
        <div className='relative space-y-7'>
            {isLoading && (
                <div className='my-10 flex items-center justify-center'>
                    <Spinner width={60} height={60} />
                </div>
            )}

            {posts.map((post) => (
                <Post key={post.id} post={post} isShared={post?.userOwner.id !== userId} />
            ))}

            <div ref={loadMoreRef} className='flex justify-center'>
                {isValidating && !isLoading && <Spinner width={60} height={60} />}
            </div>

            {!isValidating &&
                posts.length > 0 &&
                pagination.length > 0 &&
                pagination[pagination.length - 1]?.page === pagination[pagination.length - 1]?.totalPages && (
                    <div className='py-5 text-center text-gray-500'>No more posts to load 😢</div>
                )}
        </div>
    );
}

export default FeedPage;

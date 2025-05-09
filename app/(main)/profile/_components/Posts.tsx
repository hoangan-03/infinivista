'use client';

import {Spinner} from '@/components/commons';
import {useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {useGetNewsFeedByUserId} from '@/modules/feed/feed.swr';
import {useGetInfinitePosts} from '@/modules/post/post.swr';
import {IProfile} from '@/modules/profile/profile.interface';

import {Post} from '../../_components';

interface Props {
    profile?: IProfile;
}

export const Posts: React.FC<Props> = ({profile}) => {
    const {data: newsFeed} = useGetNewsFeedByUserId(profile?.id);

    const {data: posts, pagination, size, setSize, isValidating, isLoading} = useGetInfinitePosts(newsFeed?.id);
    const {loadMoreRef} = useInfiniteScrolling({
        data: posts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    return (
        <>
            <div className='space-y-7 p-7'>
                {posts.map((post) => (
                    <Post key={post.id} post={post} isShared={post?.userOwner.id !== profile?.id} />
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
        </>
    );
};

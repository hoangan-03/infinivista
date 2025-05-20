'use client';

import {useCallback, useMemo, useState} from 'react';

import {Icon, Spinner} from '@/components/commons';
import {Input} from '@/components/ui';
import {useGetProfileInfo, useInfiniteScrolling} from '@/hooks';
import {cn} from '@/lib/utils';
import {IPost} from '@/modules/post/post.interface';
import {useGetInfinitePosts} from '@/modules/post/post.swr';

import {Post} from '../_components';

function DiscoverPage() {
    const {userId} = useGetProfileInfo();
    const [searchKeyword, setSearchKeyword] = useState('');

    const {
        data: posts,
        pagination,
        size,
        setSize,
        isValidating,
        isLoading,
    } = useGetInfinitePosts(undefined, 'discover');

    // Filter posts based on search keyword
    const filteredPosts = useMemo(() => {
        if (!searchKeyword.trim()) return posts;

        const keyword = searchKeyword.trim().toLowerCase();
        // Create a regex to match whole words only
        const wordRegex = new RegExp(`\\b${keyword}\\b`, 'i');

        return posts.filter((post) => {
            // Add null/undefined checks for userOwner and content
            const usernameMatch = post.userOwner?.username
                ? wordRegex.test(post.userOwner.username.toLowerCase())
                : false;
            const contentMatch = post.content ? wordRegex.test(post.content.toLowerCase()) : false;
            return usernameMatch || contentMatch;
        });
    }, [posts, searchKeyword]);

    // Highlight search term in text - whole word only
    const highlightText = useCallback((text: string, keyword: string) => {
        if (!keyword.trim() || !text) return text || '';

        const safeKeyword = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters
        const wordRegex = new RegExp(`\\b(${safeKeyword})\\b`, 'gi');
        return text.replace(wordRegex, '<mark style="background-color: #FFFF00;">$1</mark>');
    }, []);

    // Custom post renderer with highlighting
    const renderPost = useCallback(
        (post: IPost) => {
            const isShared = post?.userOwner?.id !== userId;

            // Create modified post object with highlighted content if search is active
            const highlightedPost = searchKeyword.trim()
                ? {
                      ...post,
                      content: highlightText(post.content || '', searchKeyword),
                      userOwner: post.userOwner
                          ? {
                                ...post.userOwner,
                                username: highlightText(post.userOwner.username || '', searchKeyword),
                            }
                          : post.userOwner, // Preserve original userOwner instead of setting to null
                  }
                : post;

            return (
                <Post
                    key={post.id}
                    post={highlightedPost}
                    isShared={isShared}
                    dangerouslySetInnerHTML={!!searchKeyword.trim()}
                />
            );
        },
        [userId, searchKeyword, highlightText]
    );

    const {loadMoreRef} = useInfiniteScrolling({
        data: filteredPosts,
        pagination,
        size,
        isValidating,
        setSize,
    });

    // Calculate pagination for filtered results
    const currentPage = pagination.length > 0 ? pagination[pagination.length - 1]?.page : 1;
    const totalPages = pagination.length > 0 ? pagination[pagination.length - 1]?.totalPages : 1;
    const isEndOfResults =
        !isValidating && filteredPosts.length > 0 && pagination.length > 0 && currentPage === totalPages;

    return (
        <div className='relative flex justify-center px-10 py-4'>
            <div className='w-4/5'>
                <div className='sticky top-0 z-20 mb-12 flex h-[6.875rem] w-full flex-col bg-white pb-4 pt-8'>
                    <div className='flex w-full items-center justify-between'>
                        <h5 className='font-extrabold text-blue-700'>Discover</h5>
                        <div className='w-4/5'>
                            <Input
                                placeholder='Search'
                                prefixIcon={<Icon name='search' />}
                                className='border border-slate-300'
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                    {searchKeyword.trim() && (
                        <div className='mt-2 text-sm text-gray-500'>
                            Searching posts with keyword: <span className='font-medium'>{searchKeyword}</span>
                            {filteredPosts.length > 0 && (
                                <span className='ml-1'>({filteredPosts.length} results found)</span>
                            )}
                        </div>
                    )}
                </div>

                <div className='space-y-7 px-4'>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => renderPost(post))
                    ) : searchKeyword.trim() ? (
                        <div className='py-5 text-center text-gray-500'>No posts found matching your search</div>
                    ) : posts.length === 0 && !isLoading ? (
                        <div className='py-5 text-center text-gray-500'>No posts available</div>
                    ) : null}
                </div>

                <div ref={loadMoreRef} className={cn('flex justify-center', isValidating && !isLoading && 'py-8')}>
                    {isValidating && !isLoading && <Spinner width={60} height={60} />}
                </div>

                {isEndOfResults && <div className='py-5 text-center text-gray-500'>No more posts to load 😢</div>}
            </div>
        </div>
    );
}

export default DiscoverPage;

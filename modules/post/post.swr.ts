import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {FeedType} from '@/context';

import {PaginationRequest} from '../api.interface';
import {PostService} from './post.service';

type PostType = FeedType | 'discover' | 'all';

function useGetInfinitePosts(newsFeedId?: string, type: PostType = 'all') {
    let fetcher = newsFeedId ? PostService.getPosts : null;
    let url = newsFeedId ? PostService.ROUTES.postsByNewsFeed(newsFeedId) : null;
    if (type === 'for-you') {
        fetcher = PostService.getForYouPosts;
        url = PostService.ROUTES.postForYou;
    }
    if (type === 'discover') {
        fetcher = PostService.getDiscoverPosts;
        url = PostService.ROUTES.postDiscover;
    } else if (type === 'friends') {
        fetcher = PostService.getFriendsPosts;
        url = PostService.ROUTES.postFriends;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        if (type === 'discover' || type === 'for-you' || type === 'friends') {
            return {key: url, pagination};
        } else return newsFeedId ? {key: url, newsFeedId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(getKey, fetcher, {
        keepPreviousData: false,
        revalidateFirstPage: false,
    });

    const posts = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: posts,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfinitePostComments(postId?: string) {
    const url = postId ? PostService.ROUTES.postComments(postId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return postId ? {key: url, postId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        PostService.getPostComments,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const comments = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: comments,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetPostReactionCount(postId?: string) {
    const url = postId ? PostService.ROUTES.postReactionCount(postId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        postId ? {key: url, postId} : null,
        PostService.getPostReactionCount,
        {
            keepPreviousData: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isValidating,
        isLoading,
    };
}

function useGetPostReactions(postId?: string) {
    const url = postId ? PostService.ROUTES.postReactions(postId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        postId ? {key: url, postId} : null,
        PostService.getPostReactions,
        {
            keepPreviousData: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isValidating,
        isLoading,
    };
}

function useGetTrendingTags() {
    const {data, mutate, error, isValidating, isLoading} = useSWR(
        PostService.ROUTES.trending,
        PostService.getTrendingTags
    );

    return {
        data,
        mutate,
        error,
        isValidating,
        isLoading,
    };
}
export {
    useGetInfinitePostComments,
    useGetInfinitePosts,
    useGetPostReactionCount,
    useGetPostReactions,
    useGetTrendingTags,
};

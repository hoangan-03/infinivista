import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {FeedType} from '@/context';

import {PaginationRequest} from '../api.interface';
import {PostService} from './post.service';

type PostType = FeedType | 'discover' | 'all';

function useGetInfinitePosts(newsFeedId?: string, type: PostType = 'all') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        if (type === 'discover') {
            return {pagination};
        } else return newsFeedId ? {newsFeedId, pagination} : null;
    };

    let fetcher = PostService.getPosts;
    if (type === 'discover') {
        fetcher = PostService.getDiscoverPosts;
    }

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return postId ? {postId, pagination} : null;
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

export {useGetInfinitePostComments, useGetInfinitePosts, useGetPostReactionCount, useGetPostReactions};

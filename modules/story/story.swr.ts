import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {StoryService} from './story.service';

function useGetInfiniteStories(newsFeedId?: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 5,
        };

        return newsFeedId ? {newsFeedId, pagination} : null;
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(getKey, StoryService.getStories, {
        keepPreviousData: false,
        revalidateFirstPage: false,
    });

    const stories = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: stories,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteStoryComments(storyId?: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return storyId ? {storyId, pagination} : null;
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        StoryService.getStoryComments,
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
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetStoryReactionCount(storyId?: string) {
    const url = storyId ? StoryService.ROUTES.storyReactionCount(storyId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        storyId ? {key: url, storyId} : null,
        StoryService.getStoryReactionCount,
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

export {useGetInfiniteStories, useGetInfiniteStoryComments, useGetStoryReactionCount};

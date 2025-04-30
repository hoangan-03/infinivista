import useSWR from 'swr';

import {FeedService} from './feed.service';

function useGetNewsFeed(shouldFetch: boolean = true) {
    const url = FeedService.ROUTES.feed;
    const {data, mutate, error, isLoading, isValidating} = useSWR(
        shouldFetch ? {key: url} : null,
        FeedService.getNewsFeed,
        {
            revalidateOnFocus: false,
            keepPreviousData: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

function useGetNewsFeedByUserId(userId?: string) {
    const url = userId ? FeedService.ROUTES.feedByUserId(userId) : null;
    const {data, mutate, error, isLoading, isValidating} = useSWR(
        userId ? {key: url, userId} : null,
        FeedService.getNewsFeedByUserId,
        {
            revalidateOnFocus: false,
            keepPreviousData: false,
        }
    );

    return {
        data,
        mutate,
        error,
        isLoading,
        isValidating,
    };
}

export {useGetNewsFeed, useGetNewsFeedByUserId};

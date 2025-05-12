import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {FriendService} from './friend.service';

function useGetInfiniteFriends(userId?: string) {
    const url = userId ? FriendService.ROUTES.friend(userId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 5,
        };

        return userId ? {key: url, userId, pagination} : null;
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(getKey, FriendService.getFriends, {
        keepPreviousData: false,
        revalidateFirstPage: false,
    });

    const friends = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: friends,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteFriendRequests() {
    const url = FriendService.ROUTES.friendRequests;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return {key: url, pagination};
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        FriendService.getFriendRequests,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const requests = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: requests,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetMyInfiniteSuggestedFriends() {
    const url = FriendService.ROUTES.mySuggestedFriends;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return {key: url, pagination};
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        FriendService.getMySuggestedFriends,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const friends = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: friends,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

export {useGetInfiniteFriendRequests, useGetInfiniteFriends, useGetMyInfiniteSuggestedFriends};

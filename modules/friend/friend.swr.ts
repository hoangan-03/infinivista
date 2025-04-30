import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {FriendService} from './friend.service';

function useGetInfiniteFriends() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 5,
        };

        return {pagination};
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(getKey, FriendService.getFriends, {
        keepPreviousData: false,
        revalidateFirstPage: false,
    });

    const posts = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: posts,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteFriendRequests() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return {pagination};
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        FriendService.getFriendRequests,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const posts = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: posts,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

export {useGetInfiniteFriendRequests, useGetInfiniteFriends};

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {GroupService} from './group.service';

function useGetInfiniteMyGroups() {
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

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupService.getMyGroups,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const groups = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: groups,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetGroupById(groupId?: string) {
    const url = groupId ? GroupService.ROUTES.groupById(groupId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        groupId ? {key: url, groupId} : null,
        GroupService.getGroupById,
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

export {useGetGroupById, useGetInfiniteMyGroups};

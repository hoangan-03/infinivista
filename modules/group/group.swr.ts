import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {GroupService} from './group.service';

function useGetInfiniteMyGroups() {
    const url = GroupService.ROUTES.myGroups;
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

    console.log('group', data);

    return {
        data,
        mutate,
        error,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteGroupPosts(groupId?: string) {
    const url = groupId ? GroupService.ROUTES.groupPosts(groupId) : null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return groupId ? {key: url, groupId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupService.getGroupPosts,
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
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteGroupFollowers(groupId?: string) {
    const url = groupId ? GroupService.ROUTES.groupFollowers(groupId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return groupId ? {key: url, groupId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupService.getGroupFollowers,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const followers = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: followers,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

export {useGetGroupById, useGetInfiniteGroupFollowers, useGetInfiniteGroupPosts, useGetInfiniteMyGroups};

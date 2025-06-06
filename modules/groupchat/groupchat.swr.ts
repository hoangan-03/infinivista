import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {GroupChatService} from './groupchat.service';

function useGetInfiniteGroupChats() {
    const url = GroupChatService.ROUTES.groupChat;
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

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupChatService.getGroupChats,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const groupChats = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: groupChats,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetGroupChatById(groupChatId?: string) {
    const url = groupChatId ? GroupChatService.ROUTES.groupChatById(groupChatId) : null;

    const {data, mutate, error, isLoading, isValidating} = useSWR(
        groupChatId ? {key: url, groupChatId} : null,
        GroupChatService.getGroupChatById,
        {
            keepPreviousData: false,
            revalidateOnFocus: false,
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

function useGetInfiniteGroupChatMessages(groupChatId?: string) {
    const url = groupChatId ? GroupChatService.ROUTES.groupChatMessages(groupChatId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return groupChatId ? {key: url, groupChatId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupChatService.getGroupChatMessages,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const messages = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: messages,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetInfiniteGroupChatUsers(groupChatId?: string) {
    const url = groupChatId ? GroupChatService.ROUTES.groupChatUsers(groupChatId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return groupChatId ? {key: url, groupChatId, pagination} : null;
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        GroupChatService.getGroupChatUsers,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const messages = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: messages,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

export {useGetGroupChatById, useGetInfiniteGroupChatMessages, useGetInfiniteGroupChats, useGetInfiniteGroupChatUsers};

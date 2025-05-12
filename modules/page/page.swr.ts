import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {PageService} from './page.service';

function useGetInfiniteMyPages() {
    const url = PageService.ROUTES.myPages;
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
        PageService.getMyPages,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
        }
    );

    const pages = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: pages,
        pagination,
        mutate,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetPageById(pageId?: string) {
    const url = pageId ? PageService.ROUTES.pageById(pageId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        pageId ? {key: url, pageId} : null,
        PageService.getPageById,
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

function useGetInfinitePagePosts(pageId?: string) {
    const url = pageId ? PageService.ROUTES.pagePosts(pageId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return pageId ? {key: url, pageId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        PageService.getPagePosts,
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

function useGetInfinitePageFollowers(pageId?: string) {
    const url = pageId ? PageService.ROUTES.pageFollowers(pageId) : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return pageId ? {key: url, pageId, pagination} : null;
    };

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        PageService.getPageFollowers,
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

export {useGetInfiniteMyPages, useGetInfinitePageFollowers, useGetInfinitePagePosts, useGetPageById};

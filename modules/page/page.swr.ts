import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {PageService} from './page.service';

function useGetInfiniteMyPages() {
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

export {useGetInfiniteMyPages, useGetPageById};

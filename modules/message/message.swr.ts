import useSWRInfinite from 'swr/infinite';

import {PaginationRequest} from '../api.interface';
import {MessageService} from './message.service';

function useGetInfiniteMessages(targetId?: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data?.length) {
            return null;
        }

        const pagination: PaginationRequest = {
            page: pageIndex + 1,
            limit: 10,
        };

        return targetId ? {targetId, pagination} : null;
    };

    const {data, error, size, setSize, isValidating, isLoading} = useSWRInfinite(getKey, MessageService.getMessages, {
        keepPreviousData: false,
        revalidateFirstPage: false,
    });

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

export {useGetInfiniteMessages};

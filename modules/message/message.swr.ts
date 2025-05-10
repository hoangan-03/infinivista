import useSWR from 'swr';
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

    const {data, mutate, error, size, setSize, isValidating, isLoading} = useSWRInfinite(
        getKey,
        MessageService.getMessages,
        {
            keepPreviousData: false,
            revalidateFirstPage: false,
            // refreshInterval: 1000,
            // refreshWhenHidden: true,
        }
    );

    const messages = data ? data.flatMap((page) => page.data || []) : [];
    const pagination = data ? data.map((page) => page.metadata).filter(Boolean) : [];

    return {
        data: messages,
        mutate,
        pagination,
        error,
        size,
        setSize,
        isValidating,
        isLoading,
    };
}

function useGetMessageReaction(messageId?: string) {
    const url = messageId ? MessageService.ROUTES.messageReactions(messageId) : null;

    const {data, mutate, error, isValidating, isLoading} = useSWR(
        messageId ? {key: url, messageId} : null,
        MessageService.getMessageReactions,
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
export {useGetInfiniteMessages, useGetMessageReaction};

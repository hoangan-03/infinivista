import useSWR from 'swr';

import {RagService} from './rag.service';

export function useRagQuery(payload?: {query: string}) {
    const {data, error, isLoading, isValidating, mutate} = useSWR(
        payload?.query ? ['rag-query', payload] : null,
        () => RagService.createRagQuery({payload: payload!}),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    return {
        data: data?.data,
        error,
        isLoading,
        isValidating,
        mutate,
    };
}

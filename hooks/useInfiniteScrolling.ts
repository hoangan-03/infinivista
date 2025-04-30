'use client';

import {useEffect, useRef} from 'react';

import {PaginationMetadata} from '@/modules/api.interface';

interface Props<T> {
    data: T[];
    pagination: PaginationMetadata[];
    size: number;
    isValidating: boolean;
    setSize: (size: number) => void;
}

function useInfiniteScrolling<T>({data, pagination, size, isValidating, setSize}: Props<T>) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                const isLastPage =
                    pagination.length > 0 &&
                    pagination[pagination.length - 1]?.page === pagination[pagination.length - 1]?.totalPages;

                if (entry.isIntersecting && !isValidating && data.length > 0 && !isLastPage) {
                    setSize(size + 1);
                }
            },
            {rootMargin: '200px'}
        );

        observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isValidating, setSize, size, data.length, pagination]);

    return {
        loadMoreRef,
    };
}

export {useInfiniteScrolling};

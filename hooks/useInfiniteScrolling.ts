'use client';

import {useEffect, useRef} from 'react';

import {PaginationMetadata} from '@/modules/api.interface';

interface Props<T> {
    data: T[];
    pagination: PaginationMetadata[];
    size: number;
    isValidating: boolean;
    setSize: (size: number) => void;
    scrollAreaRef?: React.RefObject<HTMLDivElement>;
}

function useInfiniteScrolling<T>({data, pagination, size, isValidating, setSize, scrollAreaRef}: Props<T>) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        function findScrollableParent(node: HTMLElement): HTMLElement | null {
            if (!node) return document.documentElement;

            if (node.scrollHeight > node.clientHeight) {
                return node;
            }

            return findScrollableParent(node.parentElement as HTMLElement);
        }

        const scrollableRoot =
            scrollAreaRef?.current?.querySelector('[data-radix-scroll-area-viewport]') ||
            findScrollableParent(loadMoreRef.current);

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
            {root: scrollableRoot, rootMargin: '200px', threshold: 0.1}
        );

        observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isValidating, setSize, size, data.length, pagination, scrollAreaRef]);

    return {
        loadMoreRef,
    };
}

export {useInfiniteScrolling};

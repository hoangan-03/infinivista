'use client';
import {useMemo} from 'react';

interface Props {
    totalRecords: number;
    perPage: number;
    currentPage: number;
    siblingCount?: number;
}

export const ELLIPSIS = '...';

const usePagination = ({
    totalRecords,
    perPage,
    currentPage,
    siblingCount = 1,
}: Props): Array<string | number> | undefined => {
    const paginationRange = useMemo(() => {
        const totalPages = Math.ceil(totalRecords / perPage);

        const totalPageNumbers = siblingCount + 5;

        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({length}, (_, idx) => idx + start);
        };

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, ELLIPSIS, totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, ELLIPSIS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, ELLIPSIS, ...middleRange, ELLIPSIS, lastPageIndex];
        }
    }, [totalRecords, perPage, currentPage, siblingCount]);

    return paginationRange;
};

export {usePagination};

import {useMemo} from 'react';

export const ELLIPSIS = '...';

export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    adjacentPageCount: number;
}

const usePagination = ({totalPages, currentPage, adjacentPageCount}: PaginationProps): Array<string | number> => {
    const paginationRange = useMemo(() => {
        // Generate a range of numbers from start to end, inclusive
        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({length}, (_, idx) => idx + start);
        };
        // 1 ... 3 [4] 5 ... 10
        // 3 is the leftPageBoundary
        // 4 is the currentPage
        // 5 is the rightPageBoundary
        // (if adjacentPageCount is 1)
        const leftPageBoundary = Math.max(1, currentPage - adjacentPageCount);
        const rightPageBoundary = Math.min(currentPage + adjacentPageCount, totalPages);

        const shouldShowLeftEllipsis = leftPageBoundary > 2;
        const shouldShowRightEllipsis = rightPageBoundary < totalPages - 1;

        let paginationRange: Array<string | number> = [];

        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const leftItemCount = 3 + 2 * adjacentPageCount;
            const leftRange = range(1, leftItemCount);
            paginationRange = [...leftRange, ELLIPSIS, totalPages];
        } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
            const rightItemCount = 3 + 2 * adjacentPageCount;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);
            paginationRange = [1, ELLIPSIS, ...rightRange];
        } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const middleRange = range(leftPageBoundary, rightPageBoundary);
            paginationRange = [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
        } else {
            paginationRange = range(1, totalPages);
        }

        return paginationRange;
    }, [totalPages, currentPage, adjacentPageCount]);

    return paginationRange;
};

export {usePagination};

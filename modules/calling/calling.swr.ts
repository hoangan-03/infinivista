import useSWR from 'swr';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {ICallHistory} from './calling.interface';
import {CallingService} from './calling.service';

const callingService = new CallingService();

/**
 * Hook để lấy lịch sử cuộc gọi với phân trang
 * @param params Tham số phân trang (page, limit)
 * @returns Dữ liệu lịch sử cuộc gọi và trạng thái loading
 */
export const useCallHistory = (params?: PaginationRequest) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        [CallingService.ROUTES.GET_CALL_HISTORY, params],
        () => callingService.getCallHistory(params),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    return {
        callHistory: data as PaginationResponse<ICallHistory>,
        isLoading,
        isValidating,
        isError: !!error,
        error,
        mutate,
    };
};

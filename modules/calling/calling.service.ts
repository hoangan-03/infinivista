import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {ICallHistory, ICreateCallRequest, ICreateCallResponse} from './calling.interface';

export class CallingService extends APIBaseService {
    public static readonly ROUTES = {
        GET_CALL_DETAILS: (id: string) => `/api/v1/calling/${id}`,
        ACCEPT_CALL: (id: string) => `/api/v1/calling/${id}/accept`,
        END_CALL: (id: string) => `/api/v1/calling/${id}/end`,
        REJECT_CALL: (id: string) => `/api/v1/calling/${id}/reject`,
        GET_CALL_HISTORY: '/api/v1/calling/history',
        INITIATE_CALL: '/api/v1/calling/initiate',
    };

    public async getCallDetails(callId: string): Promise<ICallHistory> {
        const response = await axiosInstance.get(CallingService.ROUTES.GET_CALL_DETAILS(callId));
        return response.data.data;
    }

    public async acceptCall(callId: string): Promise<ICallHistory> {
        const response = await axiosInstance.post(CallingService.ROUTES.ACCEPT_CALL(callId));
        return response.data.data;
    }

    public async endCall(callId: string): Promise<ICallHistory> {
        const response = await axiosInstance.post(CallingService.ROUTES.END_CALL(callId));
        return response.data.data;
    }

    public async rejectCall(callId: string): Promise<ICallHistory> {
        const response = await axiosInstance.post(CallingService.ROUTES.REJECT_CALL(callId));
        return response.data.data;
    }

    public async getCallHistory(params?: PaginationRequest): Promise<PaginationResponse<ICallHistory>> {
        const response = await axiosInstance.get(CallingService.ROUTES.GET_CALL_HISTORY, {params});
        return response.data.data;
    }

    public async initiateCall(data: ICreateCallRequest): Promise<ICreateCallResponse> {
        const response = await axiosInstance.post(CallingService.ROUTES.INITIATE_CALL, data);
        return response.data.data;
    }
}

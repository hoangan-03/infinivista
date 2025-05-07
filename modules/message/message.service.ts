import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IMessage, IMessageCreate} from './message.interface';

export class MessageService extends APIBaseService {
    public static readonly ROUTES = {
        messages: (targetId: string) => APIBaseService.BASE_API_URL + `/message/messages/${targetId}/mixed`,
        message: APIBaseService.BASE_API_URL + '/message',
    };

    public static async getMessages({targetId, pagination}: {targetId: string; pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IMessage>>(MessageService.ROUTES.messages(targetId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async createMessage({payload}: {payload: IMessageCreate}) {
        return await axiosInstance.post<IMessage>(MessageService.ROUTES.message, payload);
    }
}

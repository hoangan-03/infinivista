import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IMessage} from './message.interface';

export class MessageService extends APIBaseService {
    public static readonly ROUTES = {
        messages: (targetId: string) => APIBaseService.BASE_API_URL + `/message/messages/${targetId}/mixed`,
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
}

import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {APIBaseService} from '../main.service';
import {
    IGroupChat,
    IGroupChatMessage,
    IGroupChatMessageAttachmentCreate,
    IGroupChatMessageCreate,
    IGroupChatUser,
} from './groupchat.interface';

export class GroupChatService extends APIBaseService {
    public static readonly ROUTES = {
        groupChat: APIBaseService.BASE_API_URL + '/groupchat',
        groupChatById: (groupChatId: string) => APIBaseService.BASE_API_URL + `/groupchat/${groupChatId}`,
        groupChatMessages: (groupChatId: string) => APIBaseService.BASE_API_URL + `/groupchat/messages/${groupChatId}`,
        groupChatUsers: (groupChatId: string) => APIBaseService.BASE_API_URL + `/groupchat/users/${groupChatId}`,
        groupChatMessage: APIBaseService.BASE_API_URL + '/groupchat/message',
        createGroupChatMessageAttachment: APIBaseService.BASE_API_URL + '/groupchat/attachment',
    };

    public static async getGroupChats({pagination}: {pagination?: PaginationRequest}) {
        return await axiosInstance
            .get<PaginationResponse<IGroupChat>>(GroupChatService.ROUTES.groupChat, {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
    public static async getGroupChatById({groupChatId}: {groupChatId: string}) {
        return await axiosInstance
            .get<IGroupChat>(GroupChatService.ROUTES.groupChatById(groupChatId))
            .then((res) => res.data);
    }

    public static async getGroupChatMessages({
        groupChatId,
        pagination,
    }: {
        groupChatId: string;
        pagination?: PaginationRequest;
    }) {
        return await axiosInstance
            .get<PaginationResponse<IGroupChatMessage>>(GroupChatService.ROUTES.groupChatMessages(groupChatId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }

    public static async createGroupChatMessage({payload}: {payload: IGroupChatMessageCreate}) {
        return await axiosInstance.post<IGroupChatMessage>(GroupChatService.ROUTES.groupChatMessage, payload);
    }

    public static async createGroupChatMessageAttachment({payload}: {payload: IGroupChatMessageAttachmentCreate}) {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('groupChatId', payload.groupChatId);
        formData.append('attachmentType', payload.attachmentType);
        return await axiosInstance.post<IGroupChatMessage>(
            GroupChatService.ROUTES.createGroupChatMessageAttachment,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    }

    public static async getGroupChatUsers({
        groupChatId,
        pagination,
    }: {
        groupChatId: string;
        pagination?: PaginationRequest;
    }) {
        return await axiosInstance
            .get<PaginationResponse<IGroupChatUser>>(GroupChatService.ROUTES.groupChatUsers(groupChatId), {
                params: {
                    page: pagination?.page,
                    limit: pagination?.limit,
                },
            })
            .then((res) => res.data);
    }
}

import {axiosInstance} from '@/lib/axios';

import {PaginationRequest, PaginationResponse} from '../api.interface';
import {REACTION_TYPE} from '../common.enum';
import {APIBaseService} from '../main.service';
import {
    IMessage,
    IMessageAttachmentCreate,
    IMessageCreate,
    IMessageReaction,
    IMessageReactionAdd,
    IMessageReactionDelete,
} from './message.interface';

export class MessageService extends APIBaseService {
    public static readonly ROUTES = {
        messages: (targetId: string) => APIBaseService.BASE_API_URL + `/message/messages/${targetId}/mixed`,
        message: APIBaseService.BASE_API_URL + '/message',
        createMessageAttachment: APIBaseService.BASE_API_URL + '/message/attachment',
        messageReactions: (messageId: string) => APIBaseService.BASE_API_URL + `/message/${messageId}/reaction`,
        messageReaction: (messageId: string) => APIBaseService.BASE_API_URL + `/message/${messageId}/reaction`,
        messageAttachmentReactions: (messageAttachmentId: string) =>
            APIBaseService.BASE_API_URL + `/message/attachment/${messageAttachmentId}/reaction`,
        messageAttachmentReaction: (messageAttachmentId: string) =>
            APIBaseService.BASE_API_URL + `/message/attachment/${messageAttachmentId}/reaction`,
        messageAttachmentsConversation: (targetId: string) =>
            APIBaseService.BASE_API_URL + `/message/messages/${targetId}/attachments`,
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

    public static async createMessageAttachment({payload}: {payload: IMessageAttachmentCreate}) {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('recipientId', payload.recipientId);
        formData.append('attachmentType', payload.attachmentType);
        return await axiosInstance.post<IMessage>(MessageService.ROUTES.createMessageAttachment, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    public static async getMessageReactions({messageId}: {messageId: string}) {
        return await axiosInstance
            .get<REACTION_TYPE>(MessageService.ROUTES.messageReactions(messageId))
            .then((res) => res.data);
    }

    public static async addMessageReaction(messageId: string, payload: IMessageReactionAdd) {
        return await axiosInstance.post<null>(MessageService.ROUTES.messageReaction(messageId), payload);
    }

    public static async deleteMessageReaction(messageId: string, payload: IMessageReactionDelete) {
        return await axiosInstance.delete<null>(MessageService.ROUTES.messageReaction(messageId), {data: payload});
    }
}

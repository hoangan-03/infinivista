import {REACTION_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';

export interface IGroupChatUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
}

export interface IGroupChat extends BaseEntity {
    group_chat_id: string;
    group_name: string;
    group_image_url: string | null;
    users: IGroupChatUser[];
}

export interface IGroupChatMessage extends BaseEntity {
    id: string;
    sent_at: string;
    deleted_at: string | null;
    last_modified_at: string | null;
    status: string;
    emotion: REACTION_TYPE | null;
    sender: IGroupChatUser;
    textMessage: string;
}

// interface TextMessage extends BaseMessage {
//     type: MESSAGE_TYPE.MESSAGE;
//     textMessage: string;
//     attachment_url?: never;
//     attachment_name?: never;
//     attachmentType?: never;
// }

// interface AttachmentMessage extends BaseMessage {
//     type: MESSAGE_TYPE.ATTACHMENT;
//     messageText?: never;
//     attachment_url: string;
//     attachment_name: string;
//     attachmentType: ATTACHMENT_TYPE;
// }

// export type IGroupChatMessage = TextMessage | AttachmentMessage;

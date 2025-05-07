import {ATTACHMENT_TYPE, REACTION_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';
import {MESSAGE_TYPE} from './message.enum';

interface MessageUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
}

interface BaseMessage extends BaseEntity {
    id: string;
    sent_at: string;
    deleted_at: string | null;
    last_modified_at: string | null;
    status: string;
    seen_at: string | null;
    emotion: REACTION_TYPE | null;
    sender: MessageUser;
    receiver: MessageUser;
    timestamp: string;
}

interface TextMessage extends BaseMessage {
    type: MESSAGE_TYPE.MESSAGE;
    messageText: string;
    attachment_url?: never;
    attachment_name?: never;
    attachmentType?: never;
}

interface AttachmentMessage extends BaseMessage {
    type: MESSAGE_TYPE.ATTACHMENT;
    messageText?: never;
    attachment_url: string;
    attachment_name: string;
    attachmentType: ATTACHMENT_TYPE;
}

export type IMessage = TextMessage | AttachmentMessage;

export interface IMessageCreate {
    messageText: string;
    recipientId: string;
}

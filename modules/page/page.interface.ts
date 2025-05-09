import {ATTACHMENT_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';
import {POST_VISIBILITY} from '../post/post.enum';

export interface IPage extends BaseEntity {
    id: string;
    name: string;
    description: string;
    profileImageUrl: string;
    coverImageUrl: string;
    category: string; // ALL CAPS
    website: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    owner: IPageOwner;
}

// DO NOT USE YET
export interface IPagePost extends BaseEntity {
    id: string;
    content: string;
    visibility: POST_VISIBILITY;
    userOwner: IPageOwner;
    postAttachments: IPostAttachment[];
    topics: IPostTopic[];
}

interface IPostTopic extends BaseEntity {
    id: string;
    topicName: string;
    topicDescription: string;
}

interface IPostAttachment {
    id: string;
    attachment_url: string;
    attachmentType: ATTACHMENT_TYPE;
}

interface IPageOwner {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

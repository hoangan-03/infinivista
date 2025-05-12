import {ATTACHMENT_TYPE, REACTION_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';
import {POST_VISIBILITY} from './post.enum';

export interface IPost extends BaseEntity {
    id: string;
    content: string;
    userOwner: IPostUser;
    postAttachments: IPostAttachment[];
    topics: IPostTopic[];
    visibility: POST_VISIBILITY;
}

export interface IPostTrendingTag  {
    trending: string; 
    popularity: number;
}

export interface IPostUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
}

export interface IPostAttachment {
    id: string;
    attachment_url: string;
    attachmentType: ATTACHMENT_TYPE;
}

export interface IPostTopic {
    name: string;
    description: string;
}

export interface IPostCreate {
    newsFeedId: string;
    content: string;
    files: File[];
    attachmentTypes: ATTACHMENT_TYPE[];
}

export interface IPostComment extends BaseEntity {
    id: string;
    text: string;
    attachment_url: string;
    user: IPostUser;
}

export interface IPostReactionCount {
    [REACTION_TYPE.LIKE]: number;
    [REACTION_TYPE.HEART]: number;
    [REACTION_TYPE.CARE]: number;
    [REACTION_TYPE.HAHA]: number;
    [REACTION_TYPE.SAD]: number;
    [REACTION_TYPE.WOW]: number;
    [REACTION_TYPE.ANGRY]: number;
}

export interface IPostReaction extends BaseEntity {
    id: string;
    reactionType: REACTION_TYPE;
    user_id: string;
    post_id: string;
    user: IPostUser;
}

export interface IPostCommentCreate {
    text: string;
}

export type IPostCommentUpdate = IPostCommentCreate;

export interface IPostReactionAdd {
    reactionType: REACTION_TYPE;
}

export type IPostReactionDelete = IPostReactionAdd;

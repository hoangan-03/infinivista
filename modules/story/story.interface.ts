import {ATTACHMENT_TYPE, REACTION_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';

export interface IStory extends BaseEntity {
    id: string;
    story_url: string;
    duration: number;
    attachmentType: ATTACHMENT_TYPE;
}

export interface IStoryUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
}

export interface IStoryComment extends BaseEntity {
    id: string;
    text: string;
    attachment_url: string | null;
    user: IStoryUser;
}

export interface IStoryReactionCount {
    [REACTION_TYPE.LIKE]: number;
    [REACTION_TYPE.HEART]: number;
    [REACTION_TYPE.CARE]: number;
    [REACTION_TYPE.HAHA]: number;
    [REACTION_TYPE.SAD]: number;
    [REACTION_TYPE.WOW]: number;
    [REACTION_TYPE.ANGRY]: number;
}

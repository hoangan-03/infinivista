import {ATTACHMENT_TYPE} from './post.enum';

export interface IPost {
    // TODO: Wait for real interface from the backend
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostCreate {
    newsFeedId: string;
    content: string;
    files: FileList;
    attachmentTypes: ATTACHMENT_TYPE[];
}

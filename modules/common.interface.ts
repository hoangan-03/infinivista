import {ATTACHMENT_TYPE} from './common.enum';

export interface BaseEntity {
    createdAt: string;
    updatedAt: string;
}

export interface FileWithMetadata {
    data: File;
    objectUrl: string;
    fileType: ATTACHMENT_TYPE;
}

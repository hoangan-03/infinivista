import {BaseEntity} from '../common.interface';
import {GROUP_VISIBILITY} from './group.enum';

export interface IGroup extends BaseEntity {
    id: string;
    name: string;
    description: string;
    profileImageUrl: string;
    coverImageUrl: string;
    // category: string; // ALL CAPS
    // website: string;
    // email: string;
    // phoneNumber: string;
    // address: string;
    city: string;
    country: string;
    visibility: GROUP_VISIBILITY;
    owner: IGroupOwner;
}

interface IGroupOwner {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

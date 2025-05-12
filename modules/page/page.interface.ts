import {BaseEntity} from '../common.interface';

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
    owner: IPageUser;
}

export interface IPageUser {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

import {SOCIAL_LINK_TYPE} from '../common.enum';
import {BaseEntity} from '../common.interface';
import {PROFILE_PRIVACY} from './profile.enum';

export interface IProfile extends BaseEntity {
    id: string;
    email: string;
    username: string;
    phoneNumber: string;
    dob: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    coverImageUrl: string;
    address: string;
    profilePrivacy: PROFILE_PRIVACY;
}

export interface IProfileSocialLink extends BaseEntity {
    id: string;
    type: SOCIAL_LINK_TYPE | 'YOUTUBE' | 'X' | 'TELEGRAM';
    link: string;
}

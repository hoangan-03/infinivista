import {FRIEND_PROFILE_PRIVACY} from './friend.enum';

export interface IFriend {
    id: string;
    email: string;
    username: string;
    biography: string;
    userEvent: string[];
    phoneNumber: string;
    dob: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    coverImageUrl: string;
    address: string;
    profilePrivacy: FRIEND_PROFILE_PRIVACY;
}

export interface IFriendRequest {
    id: string;
    sender_id: string;
    recipient_id: string;
    status: string;
}

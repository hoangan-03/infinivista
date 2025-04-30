import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IProfile} from './profile.interface';

export class ProfileService extends APIBaseService {
    public static readonly ROUTES = {
        me: APIBaseService.BASE_API_URL + '/auth/me',
        profileById: (userId: string) => APIBaseService.BASE_API_URL + `/profile/${userId}`,
        profileBiography: APIBaseService.BASE_API_URL + '/profile/biography',
        profileSocialLinks: APIBaseService.BASE_API_URL + '/profile/social-links',
        profileUserEvents: APIBaseService.BASE_API_URL + '/profile/user-events',
    };

    public static async getProfile() {
        return await axiosInstance.get<IProfile>(ProfileService.ROUTES.me).then((res) => res.data);
    }

    public static async getProfileById({userId}: {userId: string}) {
        return await axiosInstance.get<IProfile>(ProfileService.ROUTES.profileById(userId)).then((res) => res.data);
    }

    public static async getProfileBiography() {
        return await axiosInstance.get<string>(ProfileService.ROUTES.profileBiography).then((res) => res.data);
    }

    // TODO: Wait for BE to confirm return type, DO NOT USE IT YET
    public static async getProfileSocialLinks() {
        return await axiosInstance.get<string[]>(ProfileService.ROUTES.profileSocialLinks).then((res) => res.data);
    }

    public static async getProfileUserEvents() {
        return await axiosInstance.get<string[]>(ProfileService.ROUTES.profileUserEvents).then((res) => res.data);
    }
}

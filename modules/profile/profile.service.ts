import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IProfile, IProfileSocialLink} from './profile.interface';

export class ProfileService extends APIBaseService {
    public static readonly ROUTES = {
        me: APIBaseService.BASE_API_URL + '/auth/me',
        profileById: (userId: string) => APIBaseService.BASE_API_URL + `/profile/${userId}`,
        profileBiography: (userId: string) => APIBaseService.BASE_API_URL + `/profile/biography/${userId}`,
        profileSocialLinks: (userId: string) => APIBaseService.BASE_API_URL + `/profile/social-links/${userId}`,
        profileUserEvents: (userId: string) => APIBaseService.BASE_API_URL + `/profile/user-events/${userId}`,
    };

    public static async getProfile() {
        return await axiosInstance.get<IProfile>(ProfileService.ROUTES.me).then((res) => res.data);
    }

    public static async getProfileById({userId}: {userId: string}) {
        return await axiosInstance.get<IProfile>(ProfileService.ROUTES.profileById(userId)).then((res) => res.data);
    }

    public static async getProfileBiography({userId}: {userId: string}) {
        return await axiosInstance.get<string>(ProfileService.ROUTES.profileBiography(userId)).then((res) => res.data);
    }

    public static async getProfileSocialLinks({userId}: {userId: string}) {
        return await axiosInstance
            .get<IProfileSocialLink[]>(ProfileService.ROUTES.profileSocialLinks(userId))
            .then((res) => res.data);
    }

    public static async getProfileUserEvents({userId}: {userId: string}) {
        return await axiosInstance
            .get<string[]>(ProfileService.ROUTES.profileUserEvents(userId))
            .then((res) => res.data);
    }
}

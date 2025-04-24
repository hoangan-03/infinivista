import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IProfile} from './profile.interface';

export class ProfileService extends APIBaseService {
    public static readonly ROUTES = {
        me: APIBaseService.BASE_API_URL + '/auth/me',
    };

    public static async getProfile() {
        return await axiosInstance.get<IProfile>(ProfileService.ROUTES.me).then((res) => res.data);
    }
}

import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IAuthToken, ILoginRequest, IRegisterRequest} from './auth.interface';

export class AuthService extends APIBaseService {
    public static readonly ROUTES = {
        login: APIBaseService.BASE_API_URL + '/auth/login',
        logout: APIBaseService.BASE_API_URL + '/auth/logout',
        register: APIBaseService.BASE_API_URL + '/auth/register',
    };

    public static async login(payload: ILoginRequest) {
        return await axiosInstance.post<IAuthToken>(AuthService.ROUTES.login, payload);
    }

    public static async logout() {
        return await axiosInstance.post(AuthService.ROUTES.logout);
    }

    public static async register(payload: IRegisterRequest) {
        return await axiosInstance.post<null>(AuthService.ROUTES.register, payload);
    }
}

import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {ITranslationRequest} from './translation.interface';

export class TranslationService extends APIBaseService {
    public static readonly ROUTES = {
        translate: APIBaseService.BASE_API_URL + '/translation',
    };

    public static async translateText({payload}: {payload: ITranslationRequest}) {
        return await axiosInstance.post<string>(TranslationService.ROUTES.translate, payload);
    }
}

import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {ITranslationRequest, ITranslationResponse} from './translation.interface';

export class TranslationService extends APIBaseService {
    public static readonly ROUTES = {
        translate: APIBaseService.BASE_API_URL + '/ai/translate',
        supportedLanguages: APIBaseService.BASE_API_URL + '/ai/translate/languages',
    };

    public static async translateText({payload}: {payload: ITranslationRequest}) {
        return await axiosInstance.post<ITranslationResponse>(TranslationService.ROUTES.translate, payload);
    }

    public static async getSupportedLanguages() {
        return await axiosInstance.get(TranslationService.ROUTES.supportedLanguages);
    }
}

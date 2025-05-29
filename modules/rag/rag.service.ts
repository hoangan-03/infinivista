import {axiosInstance} from '@/lib/axios';

import {APIBaseService} from '../main.service';
import {IRagQuery, IRagQueryResponse} from './rag.interface';

export class RagService extends APIBaseService {
    public static readonly ROUTES = {
        ragQuery: APIBaseService.BASE_API_URL + '/rag/query',
    };

    public static async createRagQuery({payload}: {payload: IRagQuery}) {
        return await axiosInstance.post<IRagQueryResponse>(RagService.ROUTES.ragQuery, payload);
    }
}

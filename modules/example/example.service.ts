import axiosInstance from '@/lib/axios';

import {ResponseAPI} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IExample} from './example.interface';

export class ExampleService extends APIBaseService {
    private static readonly ROUTES = {
        example: this.BASE_API_URL + '/example',
        exampleById: (id: string) => this.BASE_API_URL + `/example/${id}`,
    };

    // ONLY GET REQUESTS HAVE .then, others like POST, PUT and DELETE do not have .then
    public static async getExamples() {
        return await axiosInstance
            .get<ResponseAPI<IExample[]>>(ExampleService.ROUTES.example)
            .then((response) => response.data);
    }
}

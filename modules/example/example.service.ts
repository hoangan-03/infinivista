import {defaultHeaders} from '../api.constant';
import {PaginationConfigResponse, ResponseAPI} from '../api.interface';
import {APIBaseService} from '../main.service';
import {IExample, IExamplePagination} from './example.interface';

export class ExampleService extends APIBaseService {
    //
    public static readonly ROUTES = {
        example: this.BASE_API_URL + '/example',
        exampleById: (id: string) => this.BASE_API_URL + `/example/${id}`,
    };

    public static readonly APP_ROUTES = {
        example: this.API_APP_ROUTE + '/example',
        exampleById: (id: string) => this.API_APP_ROUTE + `/example/${id}`,
    };

    // ONLY GET REQUESTS HAVE .then, others like POST, PUT and DELETE do not have .then
    public static async getExamples(pagination?: IExamplePagination, headers: Headers = defaultHeaders) {
        const res = await fetch(ExampleService.ROUTES.example, {
            method: 'GET',
            headers,
            body: JSON.stringify({
                page: pagination?.page,
                limit: pagination?.limit,
                startDate: pagination?.startDate,
                endDate: pagination?.endDate,
            }),
        });
        const data: ResponseAPI<PaginationConfigResponse<IExample[]>> = await res.json();
        return data;
    }
}

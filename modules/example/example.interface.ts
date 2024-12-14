import {PaginationConfigRequest} from '../api.interface';

export interface IExample {
    id: string;
    name: string;
    description: string;
}

export interface IExamplePagination extends PaginationConfigRequest {
    startDate?: string;
    endDate?: string;
}

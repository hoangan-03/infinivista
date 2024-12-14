export interface ResponseAPI<IData> {
    status: number;
    message: string;
    data: IData;
    errors?: object; // object can be any key - value pair
}

export interface PaginationConfigRequest {
    page?: number;
    limit?: number;
    keyword?: string;
}

export interface PaginationConfigResponse<IData> {
    pagination: {
        currentPage: number;
        perPage: number;
        totalItems: number;
    };
    data: IData;
}

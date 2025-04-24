export interface ResponseAPI<T> {
    status: number;
    message: string;
    data: T;
    errors?: object; // object can be any key - value pair
}

export interface PaginationRequest {
    page?: number;
    limit?: number;
    keyword?: string;
}

export interface PaginationResponse<T> {
    pagination: {
        currentPage: number;
        perPage: number;
        totalItems: number;
    };
    data: T;
}

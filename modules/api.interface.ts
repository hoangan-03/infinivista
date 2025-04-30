export interface ResponseAPI<T> {
    status: number;
    message: string;
    data: T;
    errors?: object; // object can be any key - value pair
}

export interface PaginationRequest {
    page?: number;
    limit?: number;
    // keyword?: string;
}

export interface PaginationMetadata {
    total: number; // total number of items
    page: number;
    limit: number; // number of items per page
    totalPages: number;
}

export interface PaginationResponse<T> {
    data: T[];
    metadata: PaginationMetadata;
}

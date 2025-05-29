export interface IRagQuery {
    query: string;
}
export interface IRagQueryResponse {
    success: boolean;
    data: IRagQueryResponseData;
}

export interface IRagQueryResponseData {
    query: string;
    answer: string;
    timestamp: string;
    userId: string;
}

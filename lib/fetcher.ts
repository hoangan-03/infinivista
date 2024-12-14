import queryString from 'query-string';

import {defaultHeaders} from '@/modules/api.constant';
import {HTTP_METHOD} from '@/modules/api.type';

const fetcher = async <T>(url: string, method: HTTP_METHOD, payload?: unknown): Promise<T> => {
    const headers = defaultHeaders;

    const isFormData = payload instanceof FormData;
    if (isFormData) headers.delete('Content-Type');

    const requestOptions: RequestInit = {
        method,
        headers,
        ...(method !== 'GET' && {body: isFormData ? payload : JSON.stringify(payload)}),
    };

    if (method === 'GET' && payload) {
        url += '?' + queryString.stringify(payload);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        if (response.status === 401) {
            // TODO: hanlde unauthorized
            console.log('Unauthorized');
        }
        const errorBody = await response.json();
        throw {
            status: response.status,
            statusText: response.statusText,
            ...errorBody,
        };
    }

    return response.json() as Promise<T>;
};

export default fetcher;

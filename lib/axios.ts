import axios from 'axios';

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: defaultHeaders,
    withCredentials: true,
});

export {axiosInstance, defaultHeaders};

'use client';

import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

import {axiosInstance} from '@/lib/axios';

const showToastError = (error: string, toastId: string) => {
    if (!toast.isActive(toastId)) {
        toast.error(error, {toastId});
    }
};

type Context = {
    state: {
        isUnauthorized: boolean;
    };
    resetState: () => void;
};

const AxiosInterceptorContext = createContext<Context>({
    state: {isUnauthorized: false},
    resetState: () => {},
});

export const useAxiosInterceptorContext = () => useContext(AxiosInterceptorContext);

interface Props {
    children?: ReactNode;
}

export const AxiosInterceptor: React.FC<Props> = ({children}) => {
    const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

    useEffect(() => {
        const successRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
            return config;
        };

        const errorRequestInterceptor = (error: AxiosError) => {
            return Promise.reject(error);
        };

        const successResponseInterceptor = (response: AxiosResponse) => {
            return response;
        };

        const errorResponseInterceptor = async (error: AxiosError) => {
            const toastId = 'error';
            if (error.code === 'ERR_NETWORK' && error.message === 'Network Error') {
                showToastError('Network Error', toastId);
                return Promise.reject(error);
            }
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 401:
                        {
                            setIsUnauthorized(true);
                        }
                        break;
                    case 403:
                    case 404:
                    case 422:
                    case 500:
                    case 503:
                    case 504:
                        break;
                    default:
                        break;
                }
                return Promise.reject(error);
            }
            return Promise.reject(error);
        };

        const requestInterceptor = axiosInstance.interceptors.request.use(
            successRequestInterceptor,
            errorRequestInterceptor
        );
        const responseInterceptor = axiosInstance.interceptors.response.use(
            successResponseInterceptor,
            errorResponseInterceptor
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    const resetState = () => {
        setIsUnauthorized(false);
    };

    return (
        <AxiosInterceptorContext.Provider value={{state: {isUnauthorized}, resetState}}>
            {children}
        </AxiosInterceptorContext.Provider>
    );
};

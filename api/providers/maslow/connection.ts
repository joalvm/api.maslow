import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
    Method,
} from 'axios';

import HttpRequestConfig from './domain/request-config.type';
import { Response } from './domain/response.type';

class Connection {
    public static http: AxiosInstance;

    public static bearerToken: string | null = null;

    public static clientId: number | null = null;

    static send<T, D = unknown>(url: string, method: Method, config?: HttpRequestConfig<D>): Promise<T> {
        return Connection.init<T, D>()
            .request<T, AxiosResponse<T, D>>({
                url,
                method,
                ...config,
            })
            .then((response) => response.data);
    }

    private static init<T, D>(defaultConfig: CreateAxiosDefaults<D> = {}) {
        if (Connection.http) {
            return Connection.http;
        }

        // Connection.http = new Http(import.meta.env.VITE_API_URL as string);
        Connection.http = axios.create({ ...defaultConfig, baseURL: import.meta.env.VITE_API_URL as string });

        Connection.beforeRequestInterceptor<D>();
        Connection.afterResponseInterceptor<T, D>();

        console.log('Connection is already initialized');

        return Connection.http;
    }

    private static beforeRequestInterceptor<D>() {
        Connection.http.interceptors.request.use((config: InternalAxiosRequestConfig<D>) => {
            if (Connection.bearerToken) {
                config.headers.Authorization = `Bearer ${Connection.bearerToken}`;
            }

            if (Connection.clientId) {
                config.headers['X-Current-Client'] = Connection.clientId;
            }

            return config;
        });
    }

    private static afterResponseInterceptor<T, D>() {
        Connection.http.interceptors.response.use(
            (response: AxiosResponse<T, D>) => {
                return response;
            },
            (error: AxiosError<Response<T>, D>) => {
                const { response } = error;

                if (!response) {
                    return Promise.reject<Response<T>>({
                        error: true,
                        message: 'Something went wrong',
                        code: 500,
                        data: null,
                        axiosError: error,
                    });
                }

                const { data } = response;

                return Promise.reject<Response<T>>({
                    error: true,
                    message: data?.message || 'Something went wrong',
                    code: data?.code || 500,
                    data: data?.data || null,
                    axiosError: error,
                });
            },
        );
    }
}

export default Connection;

import axios, {
    Axios,
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
    Method,
} from 'axios';

import { ApiError, HttpRequestConfig, ResponseError } from './interface';

export default class Connection {
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

    static init<T, D>(defaultConfig: CreateAxiosDefaults<D> = {}) {
        if (Connection.http instanceof Axios) {
            return Connection.http;
        }

        // Connection.http = new Http(import.meta.env.VITE_API_URL as string);
        Connection.http = axios.create({ ...defaultConfig, baseURL: import.meta.env.VITE_API_URL as string });

        // Before request
        Connection.http.interceptors.request.use((config: InternalAxiosRequestConfig<D>) => {
            if (Connection.bearerToken) {
                config.headers.Authorization = `Bearer ${Connection.bearerToken}`;
            }

            if (Connection.clientId) {
                config.headers['X-Current-Client'] = Connection.clientId;
            }

            return config;
        });

        // After response
        Connection.http.interceptors.response.use(
            (response: AxiosResponse<T, D>) => {
                return response;
            },
            (error: AxiosError<ResponseError<T>, D>): Promise<ApiError<T, D>> => {
                const { response } = error;

                return Promise.reject({
                    error: true,
                    message: response?.data.message || 'Something went wrong',
                    code: response?.data.code || 500,
                    data: response?.data.data || null,
                    axiosError: error,
                } as ApiError<T, D>);
            },
        );

        return Connection.http;
    }
}

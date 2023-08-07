import { AxiosError, AxiosRequestConfig } from 'axios';

export type Flatten<T> = T extends object
    ? {
          [K in keyof T & string]: T[K] extends Array<unknown>
              ? `${K}.*.${Flatten<T[K][number]> & string}` | K
              : NonNullable<T[K]> extends object
              ? `${K}.${Flatten<T[K]> & string}` | K
              : K;
      }[keyof T & string]
    : never;

export type HttpRequestConfig<TParams, TData = unknown> = Omit<
    AxiosRequestConfig<TData>,
    'Method' | 'url' | 'baseURL' | 'params' | 'data'
> & {
    params?: TParams;
    data?: TData;
};

export type Schema<T> = Flatten<T>[];

export type Request<T> = {
    schema?: Schema<T>;
    paginate?: boolean;
    page?: number;
    per_page?: number;
    sort?: Partial<{ [K in Flatten<T>]: 'asc' | 'desc' }>;
    contains?: {
        text: string;
        items: Schema<T>;
    };
} & Record<string, unknown>;

export type Response = {
    error: boolean;
    message: string;
    code: number;
};

export type ResponseError<T> = Response & {
    error: true;
    data: T | null | undefined;
};

export type ApiError<T = unknown, D = unknown> = {
    error: true;
    message: string;
    code: number;
    data: T | null;
    axiosError?: AxiosError<T, D>;
};

export type Collection<T> = Response & {
    data: T[];
};

export type Item<T> = Response & {
    data: T;
};

export type Paginate<T> = Collection<T> & {
    meta: {
        per_page: number;
        current_page: number;
        from: number | null;
        last_page: number;
        to: number | null;
        total: number;
    };
};

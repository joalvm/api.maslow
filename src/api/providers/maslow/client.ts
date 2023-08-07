import normalizeQueryParams from '../../utils/normalize-query-params.helper';
import Connection from './connection';
import { Collection, HttpRequestConfig, Item, Paginate, Request } from './interface';

type Schema<T> = Pick<Request<T>, 'schema'>;

export function get<TResponse, TParams extends Request<TResponse> = Request<TResponse>>(
    path: string,
    config: HttpRequestConfig<TParams> = {},
) {
    return Connection.send<Collection<TResponse>, TParams>(path, 'GET', {
        ...config,
        params: normalizeQueryParams<TResponse>(config.params || {}) as TParams,
    });
}

export async function getPage<TResponse, TParams extends Request<TResponse> = Request<TResponse>>(
    path: string,
    page = 1,
    perPage = 10,
    config: HttpRequestConfig<TParams> = {},
) {
    return Connection.send<Paginate<TResponse>, TParams>(path, 'GET', {
        ...config,
        params: normalizeQueryParams({ ...config.params, paginate: true, page, per_page: perPage }) as TParams,
    });
}

export function getOne<TResponse, TParams extends Schema<TResponse> = Schema<TResponse>>(
    path: string,
    id: number,
    config?: HttpRequestConfig<TParams>,
): Promise<Item<TResponse>>;
export function getOne<TResponse, TParams extends Schema<TResponse> = Schema<TResponse>>(
    path: string,
    config?: HttpRequestConfig<TParams>,
): Promise<Item<TResponse>>;
export function getOne<TResponse, TParams extends Schema<TResponse> = Schema<TResponse>>(...args: unknown[]) {
    let [path, id, config] = args as [string, number | null, HttpRequestConfig<TParams>];

    if (config === undefined) {
        config = id as HttpRequestConfig<TParams>;
        id = null;
        path = path.replace(/\/$/, '');
    }

    const fullPath = id ? `${path}/${id}` : path;
    const queryParams = config.params || {};

    return Connection.send<Item<TResponse>>(fullPath, 'GET', { ...config, params: normalizeQueryParams(queryParams) });
}

export function post<TData, TResponse>(path: string, data: TData, config: HttpRequestConfig<unknown, TData> = {}) {
    return Connection.send<Item<TResponse>>(path, 'POST', { data, ...config });
}

export function put<TData, TResponse>(
    path: string,
    id: number,
    data: TData,
    config?: HttpRequestConfig<unknown, TData>,
): Promise<Item<TResponse>>;
export function put<TData, TResponse>(
    path: string,
    data: TData,
    config?: HttpRequestConfig<unknown, TData>,
): Promise<Item<TResponse>>;
export function put<TData, TResponse>(...args: unknown[]) {
    const [path, id, data, config] = args as [string, number | null, TData, HttpRequestConfig<unknown, TData>];
    const fullPath = id ? `${path}/${id}` : path;

    return Connection.send<Item<TResponse>>(fullPath, 'PUT', { data, ...config });
}

export function del(path: string, id: number, config?: HttpRequestConfig<unknown, unknown>): Promise<Item<boolean>>;
export function del(path: string, config?: HttpRequestConfig<unknown, unknown>): Promise<Item<boolean>>;
export function del(...args: unknown[]) {
    const [path, id, config] = args as [string, number | null, HttpRequestConfig<unknown, unknown>];
    const fullPath = id ? `${path}/${id}` : path;

    return Connection.send<Item<boolean>>(fullPath, 'DELETE', config);
}

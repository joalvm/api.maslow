import { AxiosRequestConfig } from 'axios';

/**
 * Configuración de la solicitud HTTP.
 * @template TParams - Tipo de los parámetros de la solicitud.
 * @template TData - Tipo de los datos de la solicitud.
 */
type HttpRequestConfig<TParams, TData = unknown> = Omit<
    AxiosRequestConfig<TData>,
    'Method' | 'url' | 'baseURL' | 'params' | 'data'
> & {
    params?: TParams;
    data?: TData;
};

export default HttpRequestConfig;

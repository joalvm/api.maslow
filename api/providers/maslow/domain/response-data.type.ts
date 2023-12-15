import { Response } from './response.type';

/**
 * Representa una colección de datos de respuesta.
 * @template TData El tipo de datos contenidos en la colección.
 */
export type Collection<TData> = Response<TData[]>;

/**
 * Representa un elemento de datos de respuesta.
 * @template TData El tipo de datos contenidos en el elemento.
 */
export type Item<TData> = Response<TData>;

/**
 * Representa una colección de datos de respuesta paginados.
 * @template TData El tipo de datos contenidos en la colección.
 */
export type Paginate<TData> = Collection<TData> & {
    meta: {
        per_page: number;
        current_page: number;
        from: number | null;
        last_page: number;
        to: number | null;
        total: number;
    };
};

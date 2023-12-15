import { Flatten } from './flatten.type';

/**
 * Tipo genérico para representar una solicitud.
 * @template TFields - Tipo de los campos de la solicitud.
 */
type Request<TFields = unknown> = {
    /**
     * Esquema de los campos de la solicitud.
     */
    schema?: Flatten<TFields>[];
    /**
     * Indica si se debe paginar los resultados de la solicitud.
     */
    paginate?: boolean;
    /**
     * Número de página para la paginación.
     */
    page?: number;
    /**
     * Número de elementos por página para la paginación.
     */
    per_page?: number;
    /**
     * Ordenamiento de los resultados de la solicitud.
     */
    sort?: Partial<{ [K in Flatten<TFields>]: 'asc' | 'desc' }>;
    /**
     * Filtro de búsqueda para los resultados de la solicitud.
     */
    contains?: {
        /**
         * Texto de búsqueda.
         */
        text: string;
        /**
         * Campos en los que se debe buscar.
         */
        items: Flatten<TFields>[];
    };
    /**
     * Parámetros adicionales de la solicitud.
     */
    [K: string]: unknown;
};

export default Request;

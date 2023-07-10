import { Request } from '../providers/maslow/interface';

/**
 * Permite limpiar los parametros que serán pasados por url, manteniendo solo los que no están vacios o cumplan la condición.
 *
 * @param params Parametros url
 * @returns {object}
 */
export default function normalizeQueryParams<T>(params: Partial<Request<T>>) {
    const { schema, contains, paginate, page, per_page: perPage, sort, ...others } = params;
    const queryParams: Partial<Request<T>> = {};

    if (schema && schema.length > 0) {
        queryParams.schema = schema;
    }

    if (contains && contains.text.length > 0 && contains.items.length > 0) {
        queryParams.contains = contains;
    }

    if (paginate) {
        queryParams.paginate = paginate;

        if (page) {
            queryParams.page = page || 1;
        }

        if (perPage) {
            queryParams.per_page = perPage || 10;
        }
    }

    if (sort && Object.keys(sort).length > 0) {
        queryParams.sort = sort;
    }

    // Acción para evaluar si los filtros adicionales estan vacios.
    if (Object.keys(others).length > 0) {
        for (const [key, val] of Object.entries(others)) {
            if (val === null || val === undefined || val === '') {
                continue;
            }

            if (Array.isArray(val) && val.length === 0) {
                continue;
            }

            if (typeof val === 'object' && Object.keys(val).length === 0) {
                continue;
            }

            queryParams[key] = val;
        }
    }

    return queryParams;
}

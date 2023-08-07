/**
 * Maneja el base url de los archivos subidos a la API, si el path es una url completa,
 * la retorna tal cual, si no, le agrega el base url de la API
 */
export default function storage(path: string | undefined | null) {
    if (!path) {
        return '';
    }

    if (path?.match(/^http(s)?:\/\/|;base64,/)) {
        return path;
    }

    return (import.meta.env.VITE_API_STORAGE_URL as string) + path;
}

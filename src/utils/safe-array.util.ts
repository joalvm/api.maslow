/**
 * Permite obtener un array seguro, es decir, si el array es nulo o undefined, retorna un array vacío.
 * Si el array no es nulo, pero no es un array, lanza un error.
 * Tambien Le quita el null o undefined del tipado.
 *
 * @param list Lista a validar
 * @returns Lista segura
 */
export default function safeArray<L = unknown>(list?: L) {
    if (!list) {
        return [] as NonNullable<L>;
    }

    if (!Array.isArray(list)) {
        throw new Error('safeArray: list is not an array');
    }

    return list;
}

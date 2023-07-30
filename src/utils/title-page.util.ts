/**
 * Une el titulo de la pagina con el nombre de la aplicacion
 *
 * @param title Titulo de pagina
 */
export default function titlePage(title = '') {
    const appName = (import.meta.env.VITE_APP_NAME as string) || 'App';

    return title ? `${title} | ${appName}` : appName;
}

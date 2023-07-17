import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * El objetivo de la función RolesBoundary es manejar la lógica de redireccionamiento basada en el estado de
 * autenticación del usuario, su rol y su ubicación actual. Redirecciona al usuario a la página correspondiente
 * si no está autenticado, no tiene un cliente seleccionado o no está en la página correcta según su rol.
 *
 * @returns
 */
export default function RolesBoundary() {
    const { isAuthenticated, currentClient, userNavigationItems } = useAuthProviderContext();
    const location = useLocation();
    let to = '';

    if (!isAuthenticated) {
        if (location.pathname !== userNavigationItems.home.path) {
            to = userNavigationItems.home.path;
        }
    } else if (isAuthenticated && !currentClient) {
        // Si el usuario está autenticado pero no tiene un cliente seleccionado,
        // y no está en la página de selección de clientes,
        if (!location.pathname.includes(userNavigationItems.clientSelector.path)) {
            to = userNavigationItems.clientSelector.path;
        }
    } else if (isAuthenticated && currentClient) {
        // Si el usuario está autenticado y tiene un cliente seleccionado, pero no está en la página correcta según su rol,
        // se redirecciona a la página principal segun su rol.
        if (
            // Si vuelve al selector de clientes.
            location.pathname === userNavigationItems.clientSelector.path ||
            // Si vuelve a la pagina de inicio.
            location.pathname === userNavigationItems.home.path ||
            // Si está en cualquier página que no tenga que ver con su rol.
            !location.pathname.includes(userNavigationItems?.index?.path)
        ) {
            to = userNavigationItems?.index?.path;
        }
    }

    return to ? <Navigate to={to} replace state={{ from: location }} /> : <Outlet />;
}

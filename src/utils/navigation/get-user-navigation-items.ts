// Hook que me permite obtener los items de navegacion de la aplicacion usando el contexto de autenticacion
// y el rol del usuario autenticado

import UserRole from '@api/resources/users/domain/user-role.enum';
import navigator from '@app/router/navigation';
import { getNavigation as getClientNavigation } from '@app/router/navigation/client.navigate';
import { getNavigation as getCoordinatorNavigator } from '@app/router/navigation/coordinator.navigate';
import { getNavigation as getManagerNavigation } from '@app/router/navigation/manager.navigate';

export default function getUserNavigationItems(role: UserRole | undefined) {
    let navs = { ...navigator };

    if (role === UserRole.COORDINATOR || role === UserRole.SUPER_ADMIN) {
        navs = { ...navs, ...getCoordinatorNavigator() };
    }

    if (role === UserRole.MANAGER) {
        navs = { ...navs, ...getManagerNavigation() };
    }

    if (role === UserRole.ADMIN) {
        navs = { ...navs, ...getClientNavigation() };
    }

    return navs;
}

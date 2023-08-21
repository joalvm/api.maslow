// Hook que me permite obtener los items de navegacion de la aplicacion usando el contexto de autenticacion
// y el rol del usuario autenticado

import UserRole from '@api/resources/users/domain/user-role.enum';
import navigator from '@router/navigation';
import { getNavigation as getClientNavigation } from '@router/navigation/client.navigate';
import { getNavigation as getCoordinatorNavigator } from '@router/navigation/coordinator.navigate';
import { getNavigation as getManagerNavigation } from '@router/navigation/manager.navigate';

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

import UserRole from '../domain/user-role.enum';

export default function roleLabel(role?: UserRole) {
    if (!role) return '';

    switch (role) {
        case UserRole.SUPER_ADMIN:
            return 'Super Administrador';
        case UserRole.COORDINATOR:
            return 'Coordinador';
        case UserRole.MANAGER:
            return 'Gestor(a)';
        case UserRole.ADMIN:
            return 'Administrador';
        default:
            return 'Usuário';
    }
}

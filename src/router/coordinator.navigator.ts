import { navGroupItem, navInnerItem, navItem } from '@app/utils/navigation.util';
import { FolderOpen, GroupIcon, LayoutDashboardIcon, UserSquare2 } from 'lucide-react';

export default {
    root: navItem('/coordinator', 'Dashboard', LayoutDashboardIcon),
    profile: navInnerItem('profile', 'Perfil'),
    team: navGroupItem('team', 'Equipo', GroupIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    client: navGroupItem('clients', 'Clientes', UserSquare2, {
        clients: navItem('/', 'Clientes', UserSquare2, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
        }),
        workerTypes: navItem('worker-types', 'Tipos de trabajadores', FolderOpen, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
        }),
        collaborators: navItem('collaborators', 'Colaboradores', UserSquare2, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
        }),
        headquartes: navItem('headquartes', 'Sedes', FolderOpen, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
        }),
        tags: navItem('tags', 'Etiquetas', FolderOpen, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
        }),
    }),
};

import concatNavPaths from '@app/utils/navigation/concat-nav-paths.util';
import navGroupItem from '@app/utils/navigation/nav-group-item.util';
import navInnerItem from '@app/utils/navigation/nav-inner-item.util';
import navItem from '@app/utils/navigation/nav-item.util';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const ROOT_PATH = '/coordinator';

const index = navItem(ROOT_PATH, 'Dashboard', DashboardOutlinedIcon);

const profile = navInnerItem('profile', 'Perfil');

const team = navItem('team', 'Equipo', GroupsOutlinedIcon, {
    create: navInnerItem('create', 'Crear'),
    edit: navInnerItem(':id', 'Editar'),
});

const client = navGroupItem('clients', 'Clientes', AssignmentIndOutlinedIcon, {
    clients: navItem('/', 'Clientes', AssignmentIndOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    workerTypes: navItem('worker-types', 'Tipos de trabajadores', BadgeOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    collaborators: navItem('collaborators', 'Colaboradores', FolderSharedOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    headquartes: navItem('headquartes', 'Sedes', ApartmentOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    tags: navItem('tags', 'Etiquetas', SellOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
});

const config = navGroupItem('config', 'Configuración', TuneOutlinedIcon, {
    attentionTypes: navItem('attention-types', 'Tipos de atención', ChecklistOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
    careCenterTypes: navItem('care-center-types', 'Tipos de centro de atención', MedicalInformationOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
    }),
});

const incidence = navGroupItem('incidences', 'Incidencias', AssignmentIndOutlinedIcon, {
    incidences: navItem('/', 'Incidencias', AssignmentIndOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
        attentions: navInnerItem(':id/attentions', 'Atenciones', undefined, {
            create: navInnerItem('create', 'Crear'),
            edit: navInnerItem(':id', 'Editar'),
            binnacle: navInnerItem(':id/binnacle', 'Bitácora'),
        }),
    }),
    attentions: navItem('attentions', 'Atenciones', BadgeOutlinedIcon, {
        create: navInnerItem('create', 'Crear'),
        edit: navInnerItem(':id', 'Editar'),
        binnacle: navInnerItem(':id/binnacle', 'Bitácora'),
    }),
    requests: navItem('requests', 'Solicitudes', FolderSharedOutlinedIcon, {
        edit: navInnerItem(':id', 'Editar'),
    }),
});

export function getNavigation() {
    return concatNavPaths(
        {
            index,
            profile,
            team,
            client,
            incidence,
            config,
        },
        ROOT_PATH,
    );
}

export { ROOT_PATH, index, profile, team, client, config, incidence };

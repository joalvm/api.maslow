import concatNavPaths from '@app/utils/navigation/concat-nav-paths.util';
import navItem from '@app/utils/navigation/nav-item.util';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const ROOT_PATH = '/manager';

const index = navItem(ROOT_PATH, 'Gestor(a)', DashboardOutlinedIcon);

const profile = navItem('profile', 'Perfil');

export function getNavigation() {
    return concatNavPaths(
        {
            index,
            profile,
        },
        ROOT_PATH,
    );
}

export { ROOT_PATH, index, profile };

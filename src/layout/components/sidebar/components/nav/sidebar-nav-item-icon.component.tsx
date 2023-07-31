import ListItemIcon from '@mui/material/ListItemIcon';
import SvgIcon from '@mui/material/SvgIcon';

export interface SidebarNavItemIconProps {
    level: number;
    Icon?: typeof SvgIcon;
}

export default function SidebarNavItemIcon({ Icon }: SidebarNavItemIconProps) {
    if (!Icon) return null;

    return (
        <ListItemIcon sx={{ minWidth: 28 }}>
            {Icon && <Icon fontSize='small' sx={{ color: 'text.secondary' }} />}
        </ListItemIcon>
    );
}

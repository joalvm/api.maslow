import { NavItem, NavItemType } from '@app/router/navigation.types';
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import MUIListItemButton, { ListItemButtonProps as MUIListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import SidebarNavItemIcon from './sidebar-nav-item-icon.component';

interface SidebarNavItemProps {
    level: number;
    item: NavItem;
    open?: boolean;
    onClick?: () => void;
}

interface ListItemButtonProps extends MUIListItemButtonProps {
    level: number;
    item: NavItem;
}

function ListItemButton({ item, level, children, ...others }: ListItemButtonProps) {
    if (item.type === NavItemType.group) {
        return (
            <MUIListItemButton disableRipple disableTouchRipple {...others}>
                {children}
            </MUIListItemButton>
        );
    }

    return (
        <MUIListItemButton {...{ component: Link }} to={item.path} disableRipple disableTouchRipple sx={others.sx}>
            {children}
        </MUIListItemButton>
    );
}

export default function SidebarNavItem({ item, level, open, onClick }: SidebarNavItemProps) {
    return (
        <ListItemButton item={item} level={level} sx={{ pl: 2 * level }} onClick={onClick}>
            <SidebarNavItemIcon level={level} Icon={item.Icon} />
            <ListItemText primary={item.title} />

            {item.type === NavItemType.group &&
                (open ? (
                    <ExpandLessOutlined sx={{ color: 'text.secondary' }} />
                ) : (
                    <ExpandMoreOutlined sx={{ color: 'text.secondary' }} />
                ))}
        </ListItemButton>
    );
}

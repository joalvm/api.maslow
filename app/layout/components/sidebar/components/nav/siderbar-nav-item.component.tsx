import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import MUIListItemButton, { ListItemButtonProps as MUIListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavItem, NavItemType } from '@router/navigation.types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

function ListItemButton({ item, level, children, selected, ...others }: ListItemButtonProps) {
    if (item.type === NavItemType.group) {
        return (
            <MUIListItemButton disableRipple disableTouchRipple {...others}>
                {children}
            </MUIListItemButton>
        );
    }

    return (
        <MUIListItemButton
            {...{ component: Link }}
            to={item.path}
            disableRipple
            disableTouchRipple
            selected={selected}
            sx={others.sx}
        >
            {children}
        </MUIListItemButton>
    );
}

export default function SidebarNavItem({ item, level, open, onClick }: SidebarNavItemProps) {
    const location = useLocation();
    const [isSelected, setIsSelected] = useState(location.pathname === item.path);

    useEffect(() => {
        setIsSelected(location.pathname === item.path);
    }, [location.pathname]);

    return (
        <ListItemButton
            item={item}
            level={level}
            selected={isSelected}
            sx={{ borderRadius: 2, px: 1, mb: 1 }}
            onClick={onClick}
        >
            <SidebarNavItemIcon level={level} Icon={item.Icon} />
            <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: '.85rem', fontWeight: 500 }} />

            {item.type === NavItemType.group &&
                (open ? (
                    <ExpandLessOutlined sx={{ color: 'text.secondary' }} />
                ) : (
                    <ExpandMoreOutlined sx={{ color: 'text.secondary' }} />
                ))}
        </ListItemButton>
    );
}

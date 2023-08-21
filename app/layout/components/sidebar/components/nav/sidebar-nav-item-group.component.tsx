import { NavItem, NavItemType } from '@router/navigation.types';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SidebarNavItem from './siderbar-nav-item.component';

export interface SidebarNavItemGroupProps {
    item: NavItem;
    level: number;
}

export default function SidebarNavItemGroup({ item, level }: SidebarNavItemGroupProps) {
    const location = useLocation();
    const [childrenSelected, setChildrenSelected] = useState(
        Object.values(item.children).some((item2) => item2.path === location.pathname),
    );
    const [open, setOpen] = useState(childrenSelected);

    // Mantener abirto el grupo si alguno de sus hijos está seleccionado, se analiza cada vez que cambia la ruta
    useEffect(() => {
        setChildrenSelected(Object.values(item.children).some((item2) => item2.path === location.pathname));
    }, [location.pathname]);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <SidebarNavItem level={level} item={item} open={open} onClick={handleOpen} />
            <Collapse
                in={open}
                timeout='auto'
                unmountOnExit={false}
                sx={{ pl: 2 * level, borderBottom: open ? '1px solid' : 'none', borderColor: 'divider' }}
            >
                <List component='nav' aria-labelledby='nested-list-subheader' color='inherit' dense disablePadding>
                    {Object.values(item.children)
                        .filter((item2) => item2.type === NavItemType.item)
                        .map((item2) => (
                            <SidebarNavItem key={item2.id} level={level + 1} item={item2} />
                        ))}
                </List>
            </Collapse>
        </>
    );
}

import { NavItem, NavItemType } from '@app/router/navigation.types';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';

import SidebarNavItem from './siderbar-nav-item.component';

export interface SidebarNavItemGroupProps {
    item: NavItem;
    level: number;
}

export default function SidebarNavItemGroup({ item, level }: SidebarNavItemGroupProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <SidebarNavItem level={level} item={item} open={open} onClick={handleOpen} />
            <Collapse in={open} timeout='auto' unmountOnExit={false}>
                {Object.values(item.children)
                    .filter((item2) => item2.type === NavItemType.item)
                    .map((item2) => (
                        <SidebarNavItem key={item2.id} level={level + 1} item={item2} />
                    ))}
            </Collapse>
        </>
    );
}

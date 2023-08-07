import { useAuthProviderContext } from '@contexts/auth-provider.context';
import { NavItemType } from '@router/navigation.types';
import { Box } from '@mui/material';
import List from '@mui/material/List';

import SidebarNavItemGroup from './sidebar-nav-item-group.component';
import SidebarNavItem from './siderbar-nav-item.component';

export default function SidebarNav() {
    const { userNavigationItems } = useAuthProviderContext();

    return (
        <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
            <List component='nav' aria-labelledby='menu de navegación' dense>
                {Object.values(userNavigationItems)
                    .filter((item) => item.type !== NavItemType.inner)
                    .map((item) => {
                        if (item.type === NavItemType.group) {
                            return <SidebarNavItemGroup key={item.id} level={1} item={item} />;
                        }

                        return <SidebarNavItem level={1} key={item.id} item={item} />;
                    })}
            </List>
        </Box>
    );
}

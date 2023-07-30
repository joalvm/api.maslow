import { SIDEBAR_WIDTH, useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import { NavItemType } from '@app/router/navigation.types';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import SidebarNavItemGroup from './components/nav/sidebar-nav-item-group.component';
import SidebarNavItem from './components/nav/siderbar-nav-item.component';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    position: 'relative',
    '& .MuiPaper-root': {
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

export default function Sidebar() {
    const { userNavigationItems } = useAuthProviderContext();
    const { isMobile, sidebarOpened, setSidebarOpened } = useAdminLayoutContext();

    return (
        <Drawer
            variant={isMobile || (!isMobile && !sidebarOpened) ? 'temporary' : 'permanent'}
            anchor='left'
            open={sidebarOpened}
            onClose={() => setSidebarOpened(false)}
            PaperProps={{ elevation: 0 }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Toolbar />
            <List sx={{ width: '100%' }} component='nav' aria-labelledby='nested-list-subheader' color='inherit'>
                {Object.values(userNavigationItems)
                    .filter((item) => item.type !== NavItemType.inner)
                    .map((item) => {
                        if (item.type === NavItemType.group) {
                            return <SidebarNavItemGroup key={item.id} level={1} item={item} />;
                        }

                        return <SidebarNavItem level={1} key={item.id} item={item} />;
                    })}
            </List>
        </Drawer>
    );
}

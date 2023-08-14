import { SIDEBAR_WIDTH, useLayoutContext } from '@contexts/layout.context';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import SidebarNav from './components/nav/sidebar-nav.component';
import SidebarUserInfo from './components/siderbar-user-info.component';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    position: 'relative',
    '& .MuiPaper-root': {
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

export default function Sidebar() {
    const { isMobile, sidebarOpened, setSidebarOpened } = useLayoutContext();

    return (
        <Drawer
            variant={isMobile || (!isMobile && !sidebarOpened) ? 'temporary' : 'permanent'}
            anchor='left'
            open={sidebarOpened}
            onClose={() => setSidebarOpened(false)}
            PaperProps={{ elevation: 0 }}
            ModalProps={{ keepMounted: true, disableEnforceFocus: true }}
        >
            <Toolbar />
            <SidebarUserInfo />
            <SidebarNav />
        </Drawer>
    );
}

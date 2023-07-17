import { SIDEBAR_WIDTH, useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    position: 'relative',
    '& .MuiPaper-root': {
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

export default function Sidebar() {
    const { isMobile, sidebarOpened, setSidebarOpened } = useAdminLayoutContext();

    useEffect(() => {
        console.log('keepMounted: true');
    }, []);

    return (
        <Drawer
            variant={isMobile || (!isMobile && !sidebarOpened) ? 'temporary' : 'permanent'}
            anchor='left'
            open={sidebarOpened}
            onClose={() => setSidebarOpened(false)}
            PaperProps={{ elevation: 2 }}
            ModalProps={{
                keepMounted: true,
            }}
        ></Drawer>
    );
}

import { SIDEBAR_WIDTH, useAdminLayoutContext } from '@app/contexts/admin-layout.context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import AppBar from './components/appbar/appbar.component';
import Sidebar from './components/sidebar/sidebar.component';

const Main = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    position: 'relative',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: open ? SIDEBAR_WIDTH : 0,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },
    '& .MuiContainer-root': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function AdminLayout({ children }: PropsWithChildren) {
    const { sidebarOpened, isMobile } = useAdminLayoutContext();

    return (
        <Box flexGrow={1} position='relative'>
            {/* Sidebar Panel */}
            <Sidebar />
            {/* Navbar and container Panel */}
            <Main open={!isMobile && sidebarOpened}>
                <AppBar />
                <Box flexGrow={1} display='flex' position='relative'>
                    <Container maxWidth='xl' disableGutters={isMobile} component='main'>
                        {children}
                    </Container>
                </Box>
            </Main>
        </Box>
    );
}

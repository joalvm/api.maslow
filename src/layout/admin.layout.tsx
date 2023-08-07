import Copyright from '@components/copyright.component';
import { SIDEBAR_WIDTH, useAdminLayoutContext } from '@contexts/admin-layout.context';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import AppBar from './components/appbar/appbar.component';
import Sidebar from './components/sidebar/sidebar.component';

const Main = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    position: 'relative',
    height: `calc(100vh - ${theme.spacing(8)})`,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: open ? SIDEBAR_WIDTH : 0,
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },
}));

export default function AdminLayout({ children }: PropsWithChildren) {
    const { sidebarOpened, isMobile } = useAdminLayoutContext();

    return (
        <Box flexGrow={1} position='relative'>
            <AppBar />
            <Main open={!isMobile && sidebarOpened} sx={{ pt: { xs: 7, sm: 8 } }}>
                <Sidebar />
                {/* Contenido Principal */}
                <Box
                    flexGrow={1}
                    display='flex'
                    position='relative'
                    flexDirection='column'
                    id='flex-container'
                    component={'main'}
                    sx={(theme) => ({
                        minHeight: 'auto',
                        [theme.breakpoints.up('md')]: {
                            p: theme.spacing(2),
                        },
                    })}
                >
                    {/* Contenido de la página */}
                    {children}

                    {/* Copyright */}
                    <Box
                        sx={(theme) => ({
                            position: 'relative',
                            bottom: theme.spacing(1),
                            mt: theme.spacing(4),
                            left: '50%',
                            translate: '-50%',
                        })}
                    >
                        <Copyright />
                    </Box>
                </Box>
            </Main>
        </Box>
    );
}

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import AppBarMenuButton from './appbar-menu-button.component';
import AppBarUserButton from './appbar-user-button.component';

export default function AppBar() {
    return (
        <Appbar
            component='header'
            position='fixed'
            color='inherit'
            elevation={1}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            // sx={{
            //     flexGrow: 0,
            //     ml: { sm: 0, md: !isMobile && sidebarOpened ? `${SIDEBAR_WIDTH}px` : 0 },
            //     width: { sm: '100%', md: !isMobile && sidebarOpened ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%' },
            // }}
        >
            <Toolbar>
                <Box flexGrow={1}>
                    <AppBarMenuButton />
                </Box>
                <Box flexGrow={0} flexDirection='column' columnGap={10}>
                    <IconButton color='inherit'>
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>
                    <AppBarUserButton />
                </Box>
            </Toolbar>
        </Appbar>
    );
}

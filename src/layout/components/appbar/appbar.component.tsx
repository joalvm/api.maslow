import Logo from '@app/assets/images/logos/logo.png';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import AppBarMenuButton from './appbar-menu-button.component';
import AppBarUserButton from './appbar-user-button.component';

const Image = styled('img')(({ theme }) => ({
    display: 'block',
    marginLeft: theme.spacing(1),
    height: 28,
    [theme.breakpoints.down('sm')]: {
        height: 24,
    },
}));

export default function AppBar() {
    return (
        <Appbar
            component='header'
            position='fixed'
            color='inherit'
            elevation={0}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: '1px solid', borderColor: 'divider' }}
        >
            <Toolbar>
                <Box flexGrow={0}>
                    <AppBarMenuButton />
                </Box>

                <Box flexGrow={1} alignContent='center' alignItems='center'>
                    <Image src={Logo} alt='logo' />
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

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Typography } from '@mui/material';
import Appbar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import AppBarMenuButton from './appbar-menu-button.component';
import AppBarUserButton from './appbar-user-button.component';

export default function AppBar() {
    return (
        <Appbar component='header' position='static'>
            <Toolbar variant='dense'>
                <Box flexGrow={0}>
                    <AppBarMenuButton />
                </Box>
                <Box flexGrow={1}>
                    <Button
                        id='demo-customized-button'
                        aria-haspopup='true'
                        variant='contained'
                        disableElevation
                        disableRipple
                        disableTouchRipple
                        endIcon={<KeyboardArrowDownOutlinedIcon />}
                    >
                        Cliente
                    </Button>
                </Box>
                <Box flexGrow={0} sx={{ mr: 1 }}>
                    <IconButton color='inherit'>
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <AppBarUserButton />
                </Box>
            </Toolbar>
        </Appbar>
    );
}

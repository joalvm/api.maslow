import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import MenuItemHeading from './user-menu/menu-item-heading.component';
import MenuItemLogout from './user-menu/menu-item-logout.component';
import MenuItemProfile from './user-menu/menu-item-profile.component';

export default function AppBarUserButton() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title='Opciones de usuario'>
                <IconButton onClick={handleOpenUserMenu} color='inherit'>
                    <SettingsOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ marginLeft: 4 }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItemHeading />
                <Divider />
                <MenuItemProfile />
                <Divider />
                <MenuItemLogout />
            </Menu>
        </>
    );
}

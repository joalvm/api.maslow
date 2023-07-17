import storage from '@api/utils/storage.util';
import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import Avatar from '@mui/material/Avatar';
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
    const { profile } = useAuthProviderContext();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title='Opciones de usuario'>
                <IconButton size='small' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt={`Avatar ${profile?.names as string}`}
                        src={storage(profile?.user.avatar_url)}
                        sx={{ width: 24, height: 24 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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

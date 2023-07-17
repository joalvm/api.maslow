import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

export default function MenuItemLogout() {
    const { logout } = useAuthProviderContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Cerrar Sessión</ListItemText>
        </MenuItem>
    );
}

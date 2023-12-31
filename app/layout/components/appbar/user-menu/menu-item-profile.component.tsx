import { useAuthContext } from '@contexts/auth.context';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function MenuItemProfile() {
    const {
        userNavigationItems: { profile },
    } = useAuthContext();

    return (
        <MenuItem {...{ component: Link }} dense LinkComponent={Link} to={profile.path}>
            <ListItemIcon>
                <AccountCircleOutlinedIcon sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary='Mi Perfil' />
        </MenuItem>
    );
}

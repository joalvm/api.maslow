import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function MenuItemProfile() {
    const {
        userNavigationItems: { profile },
    } = useAuthProviderContext();

    return (
        <MenuItem {...{ component: Link }} LinkComponent={Link} to={profile.path}>
            <ListItemIcon>
                <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
    );
}

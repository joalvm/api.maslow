import storage from '@api/utils/storage.util';
import { useAuthContext } from '@contexts/auth.context';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function MenuItemHeading() {
    const { profile } = useAuthContext();

    return (
        <MenuItem disableRipple disableGutters disableTouchRipple sx={{ ':hover': { backgroundColor: 'transparent' } }}>
            <Box display='flex' alignItems='center' gap='8px' px={2}>
                <Avatar
                    src={storage(profile?.user?.avatar_url as string)}
                    sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}
                />
                <Box>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600, lineHeight: 1, fontSize: 'small' }}>
                        {`${profile?.names as string} ${profile?.last_names as string}`}
                    </Typography>
                    <Typography variant='body1' sx={{ fontSize: 12 }}>
                        {profile?.user?.email as string}
                    </Typography>
                </Box>
            </Box>
        </MenuItem>
    );
}

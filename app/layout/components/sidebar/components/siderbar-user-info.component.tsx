import storage from '@api/utils/storage.util';
import { useAuthContext } from '@contexts/auth.context';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RLink } from 'react-router-dom';

export default function SidebarUserInfo() {
    const { profile, userNavigationItems } = useAuthContext();

    if (!profile) {
        return null;
    }

    return (
        <Box paddingY={(theme) => theme.spacing(3)}>
            <Stack direction='column' alignItems='center' spacing={1}>
                <Avatar
                    alt={`avatar ${profile?.names} ${profile?.last_names}`}
                    src={storage(profile?.user?.avatar_url)}
                    sx={(theme) => ({ width: theme.spacing(7), height: theme.spacing(7) })}
                />
                <Link
                    component={RLink}
                    to={userNavigationItems.profile.path}
                    variant='caption'
                    fontWeight={500}
                    color='text.primary'
                >{`${profile?.names} ${profile?.last_names}`}</Link>
                <Typography component='p' variant='caption' sx={{ marginTop: '0 !important', display: 'block' }}>
                    {profile?.user?.email}
                </Typography>
            </Stack>
        </Box>
    );
}

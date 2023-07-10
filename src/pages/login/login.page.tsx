import PanelSide from '@app/assets/images/login-panel.jpg';
import Logo from '@app/assets/images/logos/logo.png';
import Copyright from '@app/components/copyright.component';
import titlePage from '@app/utils/title-page.util';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import LoginForm from './components/login-form.component';

const RightSide = styled(Grid)(({ theme }) => ({
    backgroundImage: `url(${PanelSide})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const LeftSide = styled(Grid)({
    display: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
});

const LogoImage = styled('img')({
    height: 'auto',
    marginBottom: '14px',
});

export default function LoginPage() {
    return (
        <>
            <Helmet title={titlePage('Login')} />
            <Grid container spacing={0}>
                <LeftSide item xs={12} sm={8} md={6} lg={5}>
                    <Box>
                        <Stack spacing={0} flex='flex' alignContent='center' alignItems='center' mb={4}>
                            <LogoImage src={Logo} alt='Logo Maslow Perú' />
                            <Typography component='h1' variant='h6'>
                                Iniciar Sesión
                            </Typography>
                            <Typography component='small' variant='body2'>
                                Ingrese sus credenciales para acceder a su cuenta.
                            </Typography>
                        </Stack>
                        <LoginForm />
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 10 }}>
                        <Copyright />
                    </Box>
                </LeftSide>
                <RightSide item xs={false} sm={4} md={6} lg={7} />
            </Grid>
        </>
    );
}

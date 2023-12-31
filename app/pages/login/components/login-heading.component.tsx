import Logo from '@assets/images/logos/logo.png';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const LogoImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(4),
    height: 'auto',
    display: 'block',
}));

export default function LoginHeading() {
    return (
        <Stack spacing={0} flex='flex' alignContent='center' alignItems='center' mb={4}>
            <LogoImage src={Logo} alt='Logo Maslow Perú' />
            <Typography component='h1' variant='h6'>
                Iniciar Sesión
            </Typography>
            <Typography component='small' variant='body2'>
                Ingrese sus credenciales para acceder a su cuenta.
            </Typography>
        </Stack>
    );
}

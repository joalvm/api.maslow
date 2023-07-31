import PanelSide from '@app/assets/images/login-panel.jpg';
import Copyright from '@app/components/copyright.component';
import titlePage from '@app/utils/title-page.util';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

import LoginForm from './components/login-form.component';
import LoginHeading from './components/login-heading.component';

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

export default function LoginPage() {
    return (
        <>
            <Helmet title={titlePage('Login')} />
            <Grid container spacing={0}>
                <LeftSide item xs={12} sm={8} md={6} lg={5}>
                    <Box>
                        <LoginHeading />
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

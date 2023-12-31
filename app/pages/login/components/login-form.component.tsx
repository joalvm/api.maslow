import SessionService from '@api/resources/session/application/session.service';
import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import { loginValidator } from '@api/resources/session/domain/login/login.validator';
import Form from '@components/forms/form.component';
import { useAuthContext } from '@contexts/auth.context';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoginFormInputEmail from './login-form/login-form-input-email.component';
import LoginFormInputPassword from './login-form/login-form-input-password.component';
import LoginFormRememberMeSwitch from './login-form/login-form-remember-me-switch.component';
import LoginFormSubmitButton from './login-form/login-form-submit-button.component';

const defaultValues: LoginInput = {
    email: '',
    password: '',
    remember_me: false,
};

export default function LoginForm() {
    const [errorRequest, setErrorRequest] = useState<string>('');
    const { authenticated } = useAuthContext();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginValidator),
        defaultValues,
        mode: 'onChange',
    });

    const onSubmit = useCallback(async (values: LoginInput) => {
        try {
            const service = new SessionService();
    
            const response = await service.login(values);

            if (response.error) {
                throw new Error(response.message);
            }

            const { token, expire_at: expiredAt } = response.data;
            const sessionProfile = await service.profile(token);

            if (sessionProfile.error) {
                throw new Error(sessionProfile.message);
            }

            setErrorRequest(sessionProfile.message);

            authenticated(token, new Date(expiredAt), sessionProfile.data);
        } catch (error) {
            setErrorRequest((error as Error).message);
        }
    }, []);

    return (
        <>
            {errorRequest && (
                <Box position='absolute' top={0}>
                    <Alert severity='error' onClose={() => setErrorRequest('')}>
                        {errorRequest}
                    </Alert>
                </Box>
            )}
            <Form id='frm-login' {...form} onSubmit={onSubmit} sx={{ width: '300px' }}>
                <Stack spacing={2}>
                    <LoginFormInputEmail />
                    <LoginFormInputPassword />
                    <LoginFormRememberMeSwitch />
                    <LoginFormSubmitButton />
                </Stack>
                <Box textAlign='center' sx={{ mt: 4 }}>
                    <Link href='#' variant='body2' color='inherit' underline='hover'>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Box>
            </Form>
        </>
    );
}

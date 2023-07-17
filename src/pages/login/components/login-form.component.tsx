import { ApiError } from '@api/providers/maslow/interface';
import login from '@api/resources/session/application/login.service';
import profile from '@api/resources/session/application/profile.service';
import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import { loginValidator } from '@api/resources/session/domain/login/login.validator';
import Form from '@app/components/forms/form.component';
import Input from '@app/components/forms/input.component';
import Switch from '@app/components/forms/switch.component';
import { useAuthProviderContext } from '@app/contexts/auth-provider.context';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues: LoginInput = {
    email: '',
    password: '',
    remember_me: false,
};

export default function LoginForm() {
    const [errorRequest, setErrorRequest] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { authenticated } = useAuthProviderContext();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginValidator),
        defaultValues,
        mode: 'onChange',
    });

    const onSubmit = useCallback(async (values: LoginInput): Promise<void> => {
        try {
            const response = await login(values);
            const { token, expire_at: expiredAt } = response.data;
            const sessionProfile = await profile(token);

            setErrorRequest(sessionProfile.message);

            authenticated(token, new Date(expiredAt), sessionProfile.data);
        } catch (error) {
            setErrorRequest((error as ApiError).message);
        }
    }, []);

    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <Form id='frm-login' {...form} onSubmit={onSubmit} sx={{ width: '300px' }}>
            <Stack spacing={2}>
                <Input
                    type='email'
                    name='email'
                    label='Correo Electronico'
                    autoComplete='username'
                    autoFocus
                    fullWidth
                    control={form.control}
                />
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    autoComplete='current-password'
                    label='Contraseña'
                    control={form.control}
                    sx={{ pr: 0 }}
                    fullWidth
                    endAdornment={
                        <IconButton type='button' onClick={toggleShowPassword}>
                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                    }
                />
                <Switch name='remember_me' label='Recordarme' control={form.control} />
                <LoadingButton
                    type='submit'
                    fullWidth
                    variant='contained'
                    loading={form.formState.isSubmitting}
                    loadingPosition='start'
                    startIcon={<LoginOutlinedIcon />}
                >
                    Iniciar Sesión
                </LoadingButton>
                <Divider />
                <Link href='#' variant='body2' sx={{ textAlign: 'center' }}>
                    Forgot password?
                </Link>
                {errorRequest && (
                    <Box position='absolute' top={0}>
                        <Alert severity='error' onClose={() => setErrorRequest('')}>
                            {errorRequest}
                        </Alert>
                    </Box>
                )}
            </Stack>
        </Form>
    );
}

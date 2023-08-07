import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import Input from '@components/forms/input.component';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
export default function LoginFormInputPassword() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { control } = useFormContext<LoginInput>();

    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    return (
        <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            autoComplete='current-password'
            label='Contraseña'
            control={control}
            sx={{ pr: 0 }}
            fullWidth
            endAdornment={
                <IconButton type='button' onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
            }
        />
    );
}

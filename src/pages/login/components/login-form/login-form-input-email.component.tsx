import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import Input from '@app/components/forms/input.component';
import { Control } from 'react-hook-form';

interface LoginFormInputEmailProps {
    control: Control<LoginInput>;
}

export default function LoginFormInputEmail({ control }: LoginFormInputEmailProps) {
    return (
        <Input
            type='email'
            name='email'
            label='Correo Electronico'
            autoComplete='username'
            autoFocus
            fullWidth
            control={control}
        />
    );
}

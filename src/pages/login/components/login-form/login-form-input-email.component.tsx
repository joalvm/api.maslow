import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import Input from '@app/components/forms/input.component';
import { useFormContext } from 'react-hook-form';

export default function LoginFormInputEmail() {
    const { control } = useFormContext<LoginInput>();

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

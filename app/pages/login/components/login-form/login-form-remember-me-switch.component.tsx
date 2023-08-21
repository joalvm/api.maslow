import { LoginInput } from '@api/resources/session/domain/login/login.interface';
import Switch from '@components/forms/switch.component';
import { useFormContext } from 'react-hook-form';

export default function LoginFormRememberMeSwitch() {
    const { control } = useFormContext<LoginInput>();

    return <Switch name='remember_me' control={control} label='Recordarme' />;
}

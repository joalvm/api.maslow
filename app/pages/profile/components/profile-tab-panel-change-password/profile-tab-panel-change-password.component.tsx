import { UserChangePasswordInput } from '@api/resources/users/domain/user.interface';
import { userChangePasswordValidator } from '@api/resources/users/domain/user.validator';
import Form from '@components/forms/form.component';
import { useAuthContext } from '@contexts/auth.context';
import { useNotifierContext } from '@contexts/notifier.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import useUpdatePassword from '@queries/profile/update-password.hook';
import { useForm } from 'react-hook-form';

import InputPassword from './profile-input-password.component';

export default function ProfileTabPanelChangePassword() {
    const { profile } = useAuthContext();
    const mutator = useUpdatePassword(profile?.user?.id as number);
    const notifier = useNotifierContext();
    const form = useForm<UserChangePasswordInput>({
        resolver: zodResolver(userChangePasswordValidator),
        defaultValues: {
            current_password: '',
            password: '',
            confirm_password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: UserChangePasswordInput) => {
        try {
            await mutator.mutateAsync(values);

            if (mutator.isError) {
                throw new Error((mutator.error as Error).message);
            }

            form.reset({
                current_password: '',
                password: '',
                confirm_password: '',
            });

            notifier.success('Contraseña actualizada');
        } catch (err) {
            notifier.error((err as Error).message);
        }
    };

    return (
        <Form {...form} id='form-change-password' onSubmit={onSubmit}>
            <Card elevation={0}>
                <CardContent>
                    <Stack spacing={2} sx={{ p: { md: 4 } }}>
                        <InputPassword name='current_password' control={form.control} label='Contraseña Actual' />
                        <InputPassword name='password' control={form.control} label='Nueva contraseña' />
                        <InputPassword
                            name='confirm_password'
                            control={form.control}
                            label='Confirmar nueva contraseña'
                        />
                    </Stack>
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <LoadingButton
                        loading={form.formState.isSubmitting}
                        disabled={!form.formState.isDirty}
                        type='submit'
                        variant='outlined'
                        startIcon={<SaveOutlinedIcon />}
                    >
                        Guardar
                    </LoadingButton>
                </CardActions>
            </Card>
        </Form>
    );
}

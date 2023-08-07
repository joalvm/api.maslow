import { UserChangePasswordInput } from '@api/resources/users/domain/user.interface';
import { userChangePasswordValidator } from '@api/resources/users/domain/user.validator';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import LoadingFab from '@components/loading-fab.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function ProfileTabPanelChangePassword() {
    const form = useForm<UserChangePasswordInput>({
        resolver: zodResolver(userChangePasswordValidator),
        defaultValues: {
            old_password: '',
            password: '',
            confirm_password: '',
        },
    });

    const onSubmit = (values: UserChangePasswordInput) => {
        console.log(values);
    };

    return (
        <Form {...form} id='form-change-password' onSubmit={onSubmit}>
            <Card elevation={0}>
                <CardContent>
                    <Stack spacing={2} sx={{ p: { md: 4 } }}>
                        <Input name='old_password' control={form.control} label='Contraseña Actual' type='password' />
                        <Input name='password' control={form.control} label='Nueva contraseña' type='password' />
                        <Input
                            name='confirm_password'
                            control={form.control}
                            label='Confirmar nueva contraseña'
                            type='password'
                        />
                    </Stack>
                    <LoadingFab type='submit' loading={form.formState.isSubmitting} label='Save' icon='save' />
                </CardContent>
            </Card>
        </Form>
    );
}

import { Profile } from '@api/resources/session/domain/profile/profile.interface';
import roleLabel from '@api/resources/users/application/role-label.helper';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import { useAuthContext } from '@contexts/auth.context';
import { useNotifierContext } from '@contexts/notifier.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import useUpdateUserEmail from '@queries/profile/update-user-email.hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const validator = z.object({
    email: z.string().email({ message: 'El correo no es válido' }),
});

type User = z.infer<typeof validator>;

export default function ProfileAccountUser() {
    const { profile, updateProfile } = useAuthContext();
    const notifier = useNotifierContext();
    const mutator = useUpdateUserEmail(profile?.user.id as number);
    const form = useForm<User>({
        resolver: zodResolver(validator),
        defaultValues: {
            email: profile?.user.email || '',
        },
    });

    const onSubmit = async (values: User) => {
        try {
            const result = await mutator.mutateAsync(values.email);

            if (mutator.isError) {
                throw new Error((mutator.error as Error).message);
            }

            notifier.success('Correo actualizado');
            form.reset({ ...form.getValues(), ...values });

            updateProfile({ ...profile, user: { ...profile?.user, email: result.email } } as Profile);
        } catch (error) {
            notifier.error((error as Error).message);
        }
    };

    return (
        <Form id='form-user' {...form} onSubmit={onSubmit}>
            <Card elevation={0}>
                <CardHeader
                    title='Información de acceso'
                    titleTypographyProps={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Input name='email' control={form.control} type='email' label='Correo de acceso' />

                        <FormControl fullWidth={true} variant='outlined'>
                            <InputLabel id='txtrole-label' htmlFor='txtrole'>
                                Rol
                            </InputLabel>
                            <OutlinedInput
                                id='txtrole'
                                value={roleLabel(profile?.user?.role)}
                                readOnly={true}
                                label='Rol'
                            />
                        </FormControl>
                    </Stack>
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
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

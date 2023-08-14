import roleLabel from '@api/resources/users/application/role-label.helper';
import { UserInput } from '@api/resources/users/domain/user.interface';
import { userValidator } from '@api/resources/users/domain/user.validator';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import { useAuthContext } from '@contexts/auth.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

export default function ProfileAccountUser() {
    const { profile } = useAuthContext();
    const form = useForm<UserInput>({
        resolver: zodResolver(userValidator),
        defaultValues: {
            email: profile?.user.email || '',
        },
    });

    const onSubmit = (values: UserInput) => {
        console.log(values);
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
                        loading={false}
                        disabled={true}
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

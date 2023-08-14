import { PersonInput } from '@api/resources/persons/domain/person.interface';
import personValidator from '@api/resources/persons/domain/person.validator';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import SelectGender from '@components/forms/select-gender.component';
import { useAuthContext } from '@contexts/auth.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

export default function ProfileAccountBasicInfo() {
    const { profile } = useAuthContext();

    const PersonForm = useForm<PersonInput>({
        resolver: zodResolver(personValidator),
        defaultValues: {
            name: profile?.names,
            last_name: profile?.last_names,
            email: profile?.email || '',
            gender: profile?.gender,
        },
    });

    const onSubmit = (values: PersonInput) => {
        console.log(values);
    };

    if (!profile) return <></>;

    return (
        <Form id='form-person' {...PersonForm} onSubmit={onSubmit}>
            <Card elevation={0}>
                <CardHeader
                    title='Información básica'
                    titleTypographyProps={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Input name='name' control={PersonForm.control} label='Nombres' />

                        <Input name='last_name' control={PersonForm.control} label='Apellidos' />

                        <Input name='email' control={PersonForm.control} label='Correo electrónico' />

                        <SelectGender name='gender' control={PersonForm.control} label='Género' />
                    </Stack>
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <LoadingButton
                        loading={PersonForm.formState.isSubmitting}
                        type='submit'
                        disabled={true}
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

import { PersonInput } from '@api/resources/persons/domain/person.interface';
import personValidator from '@api/resources/persons/domain/person.validator';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import SelectGender from '@components/forms/select-gender.component';
import { useAuthProviderContext } from '@contexts/auth-provider.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

import ProfileTabPanelBasicInfoAvatar from './profile-tab-panel-basic-info/profile-tab-panel-basic-info-avatar.component';

export default function ProfileTabPanelBasicInfo() {
    const { profile } = useAuthProviderContext();

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
        <Grid container spacing={2} padding={{ md: 4 }}>
            <Grid item lg={2} md={3} sm={12} xs={12}>
                {/* Manejo del avatar del usuario */}
                <ProfileTabPanelBasicInfoAvatar />
            </Grid>
            <Grid item lg={10} md={9} sm={12} xs={12}>
                {/* Manejo de los datos del usuario */}
                <Form id='form-person' {...PersonForm} onSubmit={onSubmit}>
                    <Card elevation={0}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Input name='name' control={PersonForm.control} label='Nombres' />

                                <Input name='last_name' control={PersonForm.control} label='Apellidos' />

                                <Input name='email' control={PersonForm.control} label='Correo electrónico' />

                                <SelectGender name='gender' control={PersonForm.control} label='Género' />
                            </Stack>
                        </CardContent>
                        <CardActions
                            disableSpacing
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
                        >
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
                <Typography variant='h6' sx={{ mt: 2 }} marginBottom={1}>
                    Cuenta
                </Typography>
                <Card elevation={0}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Input name='email' control={PersonForm.control} type='email' label='Correo de acceso' />
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
            </Grid>
        </Grid>
    );
}

import { PersonInput } from '@api/resources/persons/domain/person.interface';
import personValidator from '@api/resources/persons/domain/person.validator';
import { Profile } from '@api/resources/session/domain/profile/profile.interface';
import Form from '@components/forms/form.component';
import Input from '@components/forms/input.component';
import Select from '@components/forms/select.component';
import SelectGender from '@components/forms/select-gender.component';
import { useAuthContext } from '@contexts/auth.context';
import { useNotifierContext } from '@contexts/notifier.context';
import { zodResolver } from '@hookform/resolvers/zod';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

import useDocumentTypes from './get-document-types.hook';
import useUpdatePersonInfo from './update-person-info.hook';

export default function ProfileAccountBasicInfo() {
    const { profile, updateProfile } = useAuthContext();
    const documentTypes = useDocumentTypes();
    const notifier = useNotifierContext();
    const mutator = useUpdatePersonInfo(profile?.id as number);

    const form = useForm<PersonInput>({
        resolver: zodResolver(personValidator),
        defaultValues: {
            names: profile?.names,
            last_names: profile?.last_names,
            email: profile?.email || '',
            gender: profile?.gender,
            document_type_id: profile?.document_type.id,
            id_document: profile?.id_document,
        },
    });

    const onSubmit = async (values: PersonInput) => {
        try {
            const result = await mutator.mutateAsync(values);

            if (mutator.isError) {
                throw new Error((mutator.error as Error).message);
            }

            notifier.success('Información actualizada');
            updateProfile({ ...profile, ...result } as Profile);
            form.reset({ ...form.getValues(), ...values });
        } catch (error) {
            notifier.error((error as Error).message);
        }
    };

    if (!profile) return <></>;

    return (
        <Form id='form-person' {...form} onSubmit={onSubmit}>
            <Card elevation={0}>
                <CardHeader
                    title='Información básica'
                    titleTypographyProps={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Input name='names' control={form.control} label='Nombres' />

                        <Input name='last_names' control={form.control} label='Apellidos' />

                        <Input type='email' name='email' control={form.control} label='Correo electrónico' />

                        <SelectGender name='gender' control={form.control} label='Género' />

                        <Select
                            name='document_type_id'
                            label='Tipo de documento'
                            control={form.control}
                            options={documentTypes.data}
                        />

                        <Input name='id_document' control={form.control} label='Número de documento' />
                    </Stack>
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    <LoadingButton
                        loading={form.formState.isSubmitting}
                        type='submit'
                        disabled={!form.formState.isDirty}
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

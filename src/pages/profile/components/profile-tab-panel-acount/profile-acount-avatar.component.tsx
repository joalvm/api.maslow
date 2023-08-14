import { uploadAvatarImage } from '@api/resources/files/application/upload.service';
import { Profile } from '@api/resources/session/domain/profile/profile.interface';
import updateUser from '@api/resources/users/application/user.service';
import { UserInput } from '@api/resources/users/domain/user.interface';
import storage from '@api/utils/storage.util';
import Form from '@components/forms/form.component';
import { useAuthContext } from '@contexts/auth.context';
import { useNotifierContext } from '@contexts/notifier.context';
import { zodResolver } from '@hookform/resolvers/zod';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import compressImage from '@utils/compress-image';
import getBase64FromFile from '@utils/get-base64-image.util';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const resolver = zodResolver(
    z.object({
        avatar_url: z.string().optional(),
    }),
);

export default function ProfileAcountAvatar() {
    const notifier = useNotifierContext();
    const { profile, updateProfile } = useAuthContext();
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const UserForm = useForm<UserInput>({
        resolver,
        defaultValues: {
            avatar_url: profile?.user.avatar_url || '',
        },
    });

    const imageUrl = UserForm.watch('avatar_url');

    const uploadImage = async () => {
        if (!currentFile) {
            throw new Error('No se ha seleccionado una imagen');
        }

        const image = await compressImage(currentFile);

        const result = await uploadAvatarImage(image);

        if (result.error) {
            throw new Error(result.message);
        }

        return result.data;
    };

    const updateUserAvatar = async (path: string) => {
        UserForm.setValue('avatar_url', storage(path));

        const result = await updateUser(profile?.user?.id as number, { avatar_url: path });

        if (result.error) {
            throw new Error(result.message);
        }

        updateProfile({ ...profile, user: { ...profile?.user, avatar_url: path } } as Profile);
    };

    const handleOnSubmit = async (values: UserInput) => {
        try {
            if (!values.avatar_url) {
                throw new Error('No se ha seleccionado una imagen');
            }

            await updateUserAvatar((await uploadImage()).path);

            notifier.success('Imagen de perfil actualizada');
        } catch (error) {
            notifier.error((error as Error).message);
        }
    };

    const handleOnChangeInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file) return;

            setCurrentFile(file);

            UserForm.setValue('avatar_url', await getBase64FromFile(file));
        } catch (error) {
            notifier.error((error as Error).message);
        }
    };

    if (!profile) return <></>;

    return (
        <Form id='form-user' {...UserForm} onSubmit={handleOnSubmit}>
            <Box display='flex' flexDirection='column' pt={{ xs: 4, md: 2 }} alignContent='center' alignItems='center'>
                <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{}}
                    badgeContent={
                        <IconButton
                            {...{ component: 'label' }}
                            disabled={UserForm.formState.isSubmitting}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                        >
                            <input
                                type='file'
                                hidden
                                onChange={handleOnChangeInputFile}
                                accept='image/*,capture=camera'
                            />
                            <AddAPhotoOutlinedIcon fontSize='small' />
                        </IconButton>
                    }
                >
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        alt={`${profile.names} ${profile.last_names}`}
                        src={storage(imageUrl)}
                    />
                </Badge>
                <LoadingButton
                    variant='outlined'
                    type='submit'
                    size='small'
                    loading={UserForm.formState.isSubmitting}
                    disabled={currentFile === null}
                    sx={{ mt: { md: 4, xs: 2 } }}
                >
                    Guardar
                </LoadingButton>
            </Box>
        </Form>
    );
}

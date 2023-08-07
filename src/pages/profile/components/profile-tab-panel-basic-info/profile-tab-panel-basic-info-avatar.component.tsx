import { UserInput } from '@api/resources/users/domain/user.interface';
import storage from '@api/utils/storage.util';
import Form from '@components/forms/form.component';
import { useAuthProviderContext } from '@contexts/auth-provider.context';
import { zodResolver } from '@hookform/resolvers/zod';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import getBase64FromFile from '@utils/get-base64-image.util';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const resolver = zodResolver(
    z.object({
        avatar_url: z.string().optional(),
    }),
);

export default function ProfileTabPanelBasicInfoAvatar() {
    const { profile } = useAuthProviderContext();
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const UserForm = useForm<UserInput>({
        resolver,
        defaultValues: {
            avatar_url: profile?.user.avatar_url || '',
        },
    });

    const imageUrl = UserForm.watch('avatar_url');

    const onSubmit = (values: UserInput) => {
        console.log(values);
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setCurrentFile(file);

        UserForm.setValue('avatar_url', await getBase64FromFile(file));
    };

    if (!profile) return <></>;

    return (
        <Form id='form-user' {...UserForm} onSubmit={onSubmit}>
            <Box
                display='flex'
                width='100%'
                flexDirection='column'
                pt={{ xs: 4, md: 2 }}
                alignContent='center'
                alignItems='center'
            >
                <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{}}
                    badgeContent={
                        <IconButton
                            {...{ component: 'label' }}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                        >
                            <input type='file' hidden onChange={handleUploadImage} accept='image/*,capture=camera' />
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
                <Button
                    variant='outlined'
                    type='submit'
                    size='small'
                    disabled={currentFile === null}
                    sx={{ mt: { md: 4, xs: 2 } }}
                >
                    Guardar
                </Button>
            </Box>
        </Form>
    );
}

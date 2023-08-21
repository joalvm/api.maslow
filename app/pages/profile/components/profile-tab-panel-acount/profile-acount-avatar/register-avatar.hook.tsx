import { uploadAvatarImage } from '@api/resources/files/application/upload.service';
import UserService from '@api/resources/users/application/user.service';
import compressImage from '@utils/compress-image.util';
import { useMutation } from 'react-query';

async function registerImage(file: File) {
    const image = await compressImage(file);

    const result = await uploadAvatarImage(image);

    if (result.error) {
        throw new Error(result.message);
    }

    return result.data.path;
}

export default function useRegisterAvatar(userId: number) {
    return useMutation({
        mutationKey: ['registerAvatar', userId],
        mutationFn: async (file: File) => {
            const result = await UserService.update(userId, {
                avatar_url: await registerImage(file),
            });

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}

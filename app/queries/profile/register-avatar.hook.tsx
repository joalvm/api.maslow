import FileService from '@api/resources/files/application/upload.service';
import UserService from '@api/resources/users/application/user.service';
import compressImage from '@utils/compress-image.util';
import { useMutation } from 'react-query';

async function registerImage(file: File) {
    const image = await compressImage(file);
    const service = new FileService();

    const result = await service.uploadAvatar(image);

    if (result.error) {
        throw new Error(result.message);
    }

    return result.data.path;
}

export default function useRegisterAvatar(userId: number) {
    return useMutation({
        mutationKey: ['registerAvatar', userId],
        mutationFn: async (file: File) => {
            const service = new UserService();
            const fileUrl = await registerImage(file);
            const result = await service.update(userId, { avatar_url: fileUrl });

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}

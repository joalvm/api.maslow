import UserService from '@api/resources/users/application/user.service';
import { UserChangePasswordInput } from '@api/resources/users/domain/user.interface';
import { useMutation } from 'react-query';

export default function useUpdatePassword(userId: number) {
    return useMutation({
        mutationKey: ['update-password', userId],
        mutationFn: async (values: UserChangePasswordInput) => {
            const result = await UserService.updatePassword(userId, values);

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}

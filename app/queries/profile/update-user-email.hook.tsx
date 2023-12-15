import UserService from '@api/resources/users/application/user.service';
import { useMutation } from 'react-query';

export default function useUpdateUserEmail(userId: number) {
    return useMutation({
        mutationKey: ['update-user', userId],
        mutationFn: async (email: string) => {
            const service = new UserService();

            const result = await service.update(userId, { email });

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}

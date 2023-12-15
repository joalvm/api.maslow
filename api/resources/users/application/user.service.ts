import { put } from '@api/providers/maslow/client';

import { User, UserChangePasswordInput, UserInput } from '../domain/user.interface';

class UserService {
    path = 'users';

    update(userId: number, input: Partial<UserInput>) {
        return put<Partial<UserInput>, User>(this.path, userId, input);
    }

    changePassword(userId: number, input: UserChangePasswordInput) {
        return put<UserChangePasswordInput, User>(this.path, userId, input);
    }
}

export default UserService;

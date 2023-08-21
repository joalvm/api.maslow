import { put } from '@api/providers/maslow/client';

import { User, UserChangePasswordInput, UserInput } from '../domain/user.interface';

export default class UserService {
    static path = 'users';

    static update(userId: number, input: Partial<UserInput>) {
        return put<Partial<UserInput>, User>(UserService.path, userId, input);
    }

    static updatePassword(userId: number, input: UserChangePasswordInput) {
        return put<UserChangePasswordInput, User>(UserService.path, userId, input);
    }
}

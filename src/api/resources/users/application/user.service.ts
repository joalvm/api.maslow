import { put } from '@api/providers/maslow/client';

import { User, UserInput } from '../domain/user.interface';

export default function updateUser(userId: number, input: Partial<UserInput>) {
    return put<Partial<UserInput>, User>('users', userId, input);
}

import { post } from '@api/providers/maslow/client';

import { LoginInput, LoginOutput } from '../domain/login/login.interface';

export default function login(input: LoginInput) {
    return post<LoginInput, LoginOutput>('session', input);
}

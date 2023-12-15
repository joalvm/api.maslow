import { del, getOne, post } from '@api/providers/maslow/client';

import { LoginInput, LoginOutput } from '../domain/login/login.interface';
import { Profile } from '../domain/profile/profile.interface';

class SessionService {
    path = 'session';

    login(input: LoginInput) {
        return post<LoginInput, LoginOutput>(this.path, input);
    }

    logout(id: number) {
        return del(this.path, id);
    }

    profile(token: string) {
        return getOne<Profile>(this.path, { headers: { Authorization: `Bearer ${token}` } });
    }
}

export default SessionService;

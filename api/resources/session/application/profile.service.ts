import { getOne } from '@api/providers/maslow/client';

import { Profile } from '../domain/profile/profile.interface';

export default function profile(token: string) {
    return getOne<Profile>('session', {
        headers: { Authorization: `Bearer ${token}` },
    });
}

import { del } from '@api/providers/maslow/client';

export default function logout() {
    return del('session');
}

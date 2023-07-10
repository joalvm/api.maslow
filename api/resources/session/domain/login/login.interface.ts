import { z } from 'zod';

import { loginValidator } from './login.validator';

export type LoginInput = z.infer<typeof loginValidator>;

export interface LoginOutput {
    token: string;
    expire_at: Date;
}

import { Person } from '@api/resources/persons/domain/person.interface';
import { z } from 'zod';

import { userValidator } from './user.validator';
import UserRole from './user-role.enum';

/**
 * Objeto usado para representar un usuario.
 */
export type User = {
    id: number;
    role: UserRole;
    email: string;
    avatar_url?: string | null;
    verified_at?: string | null;
    password_reset_at?: string | null;
    login_at?: string | null;
    enabled: boolean;
    person: Person;
    created_at: string;
    updated_at: string;
};

export type UserBasic = Omit<User, 'person' | 'created_at' | 'updated_at'>;

export type UserBasicWithPerson = Omit<User, 'created_at' | 'updated_at'>;

export type UserInput = z.infer<typeof userValidator>;

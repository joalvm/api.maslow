import { z } from 'zod';

import personValidator from '../../persons/domain/person.validator';
import UserRole from './user-role.enum';

// la regla de validación debe validar que si la key person_id no se encuentra en el objeto, entonces debe existir la key person
// y viceversa
const basicValidator = z.object({
    client_id: z.number().int().positive().min(1),
    role: z.nativeEnum(UserRole),
    email: z.string().email(),
    avatar_url: z.string().optional(),
    enabled: z.boolean().default(true),
});

export const userValidator = basicValidator
    .merge(z.object({ person_id: z.number().int().positive().min(1) }))
    .or(basicValidator.merge(z.object({ person: personValidator })));

export const userChangePasswordValidator = z
    .object({
        old_password: z.string().min(8),
        password: z.string().min(8),
        confirm_password: z.string().min(8),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Las contraseñas no coinciden',
        path: ['confirm_password'],
    });

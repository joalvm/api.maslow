import * as z from 'zod';

export const loginValidator = z.object({
    email: z.string().email().describe('Correo electrónico'),
    password: z.string().min(8).describe('Contraseña'),
    remember_me: z.boolean().optional().default(false).describe('Recordar sesión'),
});

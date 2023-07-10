import { z } from 'zod';

import Gender from './gender.enum';

const personValidator = z.object({
    name: z
        .string()
        .regex(/^[a-zA-Z ]+$/, 'El nombre solo puede contener letras')
        .min(3),
    last_name: z
        .string()
        .regex(/^[a-zA-Z ]+$/, 'El apellido solo puede contener letras')
        .min(3),
    document_type_id: z.number().int().min(1),
    id_document: z.string().min(3),
    gender: z.nativeEnum(Gender),
    email: z.string().email(),
});

export default personValidator;

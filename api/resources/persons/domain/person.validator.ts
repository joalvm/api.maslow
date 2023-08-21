import { z } from 'zod';

import Gender from './gender.enum';

const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛçÇ]+( ?[a-zA-ZáéíóúÁÉÍÓÚüÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛçÇ]+)*$/;

const personValidator = z.object({
    names: z.string().regex(regex, 'El nombre solo puede contener palabras y espacios entre ellas').min(3),
    last_names: z.string().regex(regex, 'El apellido solo puede contener palabras y espacios entre ellas').min(3),
    document_type_id: z.number().int().min(1),
    id_document: z.string().min(3),
    gender: z.nativeEnum(Gender),
    email: z.string().email(),
});

export default personValidator;

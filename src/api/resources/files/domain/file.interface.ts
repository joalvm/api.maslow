import z from 'zod';

import { fileValidator } from './file.validator';

export type FileInput = z.infer<typeof fileValidator>;

export type FileOutput = {
    id: number;
    path: string;
};

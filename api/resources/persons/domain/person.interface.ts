import { DocumentTypeBasic } from '@api/resources/document-types/domain/document-type.interface';
import { z } from 'zod';

import Gender from './gender.enum';
import personValidator from './person.validator';

export type Person = {
    id: number;
    names: string;
    last_names: string;
    gender: Gender;
    email?: string | null;
    id_document: string;
    document_type: DocumentTypeBasic;
    created_at: string;
    updated_at: string;
};

export type PersonBasic = Omit<Person, 'document_type' | 'created_at' | 'updated_at'>;

export type PersonInput = z.infer<typeof personValidator>;

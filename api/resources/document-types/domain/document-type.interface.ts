import { z } from 'zod';

import DocumentCharType from './document-char-type.enum';
import DocumentLengthType from './document-length-type.enum';
import documentTypeValidator from './document-type.validator';

/**
 * Representa un tipo de documento.
 */
export type DocumentType = {
    id: number;
    name: string;
    abbr: string;
    length: number;
    length_type: DocumentLengthType;
    char_type: DocumentCharType;
    created_at: string;
    updated_at: string;
};

/**
 * Objeto usado para representar un tipo de documento con la información básica.
 */
export type DocumentTypeBasic = Omit<DocumentType, 'created_at' | 'updated_at'>;

/**
 * Objeto usado para manipular un tipo de documento.
 */
export type DocumentTypeInput = z.infer<typeof documentTypeValidator>;

import { z } from 'zod';

import DocumentCharType from './document-char-type.enum';
import DocumentLengthType from './document-length-type.enum';

const documentTypeValidator = z.object({
    name: z.string().min(3),
    abbr: z.string().min(2),
    length: z.number().int().min(1),
    length_type: z.nativeEnum(DocumentLengthType),
    char_type: z.nativeEnum(DocumentCharType),
});

export default documentTypeValidator;

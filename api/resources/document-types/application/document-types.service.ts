import { get, getOne } from '@api/providers/maslow/client';
import { Request } from '@api/providers/maslow/interface';

import { DocumentType } from '../domain/document-type.interface';

export default class DocumentTypesService {
    static path = 'document_types';

    static all(params: Request<DocumentType> = {}) {
        return get<DocumentType>(DocumentTypesService.path, { params });
    }

    static find(id: number, params: Request<DocumentType> = {}) {
        return getOne<DocumentType>(DocumentTypesService.path, id, { params });
    }
}

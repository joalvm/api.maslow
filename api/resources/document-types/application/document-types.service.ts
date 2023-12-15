import { get, getOne } from '@api/providers/maslow/client';
import Request from '@api/providers/maslow/domain/request.type';

import { DocumentType } from '../domain/document-type.interface';

class DocumentTypesService {
    path = 'document_types';

    all(params: Request<DocumentType> = {}) {
        return get<DocumentType>(this.path, { params });
    }

    find(id: number, params: Request<DocumentType> = {}) {
        return getOne<DocumentType>(this.path, id, { params });
    }
}

export default DocumentTypesService;

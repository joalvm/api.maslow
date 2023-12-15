import { ClientBasic } from '@api/resources/clients/client.interface';
import { DocumentTypeBasic } from '@api/resources/document-types/domain/document-type.interface';
import { Person } from '@api/resources/persons/domain/person.interface';
import { UserBasic } from '@api/resources/users/domain/user.interface';

export type Profile = Omit<Person, 'created_at' | 'updated_at'> & {
    document_type: DocumentTypeBasic;
    user: UserBasic;
    clients: ClientBasic[];
};

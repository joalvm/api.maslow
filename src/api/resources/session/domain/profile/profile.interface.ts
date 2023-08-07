import { ClientBasic } from '@api/resources/clients/client.interface';
import { PersonBasicWithDocumentType } from '@api/resources/persons/domain/person.interface';
import { UserBasic } from '@api/resources/users/domain/user.interface';

export type Profile = PersonBasicWithDocumentType & {
    user: UserBasic;
    clients: ClientBasic[];
};

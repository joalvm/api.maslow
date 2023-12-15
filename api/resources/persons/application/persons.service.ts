import { get, getOne, post, put } from '@api/providers/maslow/client';
import Request from '@api/providers/maslow/domain/request.type';

import { Person, PersonInput } from '../domain/person.interface';

export default class PersonsService {
    path = 'persons';

    all(params: Request<Person> = {}) {
        return get<Person>(this.path, { params });
    }

    find(id: number, params: Request<Person> = {}) {
        return getOne<Person>(this.path, id, { params });
    }

    create(data: PersonInput) {
        return post<PersonInput, Person>(this.path, data);
    }

    update(id: number, data: PersonInput) {
        return put<PersonInput, Person>(this.path, id, data);
    }
}

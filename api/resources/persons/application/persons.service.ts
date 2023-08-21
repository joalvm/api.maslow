import { get, getOne, post, put } from '@api/providers/maslow/client';
import { Request } from '@api/providers/maslow/interface';

import { Person, PersonInput } from '../domain/person.interface';

export default class PersonsService {
    static path = 'persons';

    public static all(params: Request<Person> = {}) {
        return get<Person>(PersonsService.path, { params });
    }

    public static find(id: number, params: Request<Person> = {}) {
        return getOne<Person>(PersonsService.path, id, { params });
    }

    public static create(data: PersonInput) {
        return post<PersonInput, Person>(PersonsService.path, data);
    }

    public static update(id: number, data: PersonInput) {
        return put<PersonInput, Person>(PersonsService.path, id, data);
    }
}

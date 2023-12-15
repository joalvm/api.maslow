import PersonsService from '@api/resources/persons/application/persons.service';
import { PersonInput } from '@api/resources/persons/domain/person.interface';
import { useMutation } from 'react-query';

export default function useUpdatePersonInfo(personId: number) {
    return useMutation({
        mutationKey: ['updatePerson', personId],
        mutationFn: async (values: PersonInput) => {
            const service = new PersonsService();
    
            const result = await service.update(personId, values);

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}

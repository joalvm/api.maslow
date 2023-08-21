import DocumentTypesService from '@api/resources/document-types/application/document-types.service';
import { useQuery } from 'react-query';

export default function useDocumentTypes() {
    return useQuery({
        queryKey: ['getDocumentTypes'],
        queryFn: async () => {
            const result = await DocumentTypesService.all();

            if (result.error) {
                throw new Error(result.message);
            }

            return result.data.map((documentType) => ({
                value: documentType.id,
                label: documentType.name,
            }));
        },
    });
}

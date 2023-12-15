import { post } from '@api/providers/maslow/client';
import toIso8601 from '@api/utils/to-iso8601.util';

import { FileInput, FileOutput } from '../domain/file.interface';
import { Bucket } from '../domain/file-bucket.enum';

class FileService {
    path = 'files';

    uploadAvatar(file: File | Blob) {
        const form = new FormData();

        form.append('file', file);
        form.append('bucket', Bucket.USER_AVATARS);
        form.append('generated_at', toIso8601(new Date()));

        return post<FormData, FileOutput>(this.path, form);
    }

    uploadAttentionImage(input: FileInput & { bucket: Bucket.ATTENTIONS }) {
        const form = new FormData();

        form.append('file', input.file);
        form.append('bucket', input.bucket);
        form.append('generated_at', toIso8601(input.generatedAt));
        form.append('client_id', input.clientId.toString());
        form.append('incidence_id', input.incidenceId.toString());
        form.append('attention_id', input.attentionId.toString());

        return post<FormData, FileOutput>(this.path, form);
    }

    BinnacleImage(input: FileInput & { bucket: Bucket.BINNACLES }) {
        const form = new FormData();

        form.append('file', input.file);
        form.append('bucket', input.bucket);
        form.append('generated_at', toIso8601(input.generatedAt));
        form.append('client_id', input.clientId.toString());
        form.append('incidence_id', input.incidenceId.toString());
        form.append('attention_id', input.attentionId.toString());
        form.append('binnacle_id', input.binnacleId.toString());

        return post<FormData, FileOutput>(this.path, form);
    }
}

export default FileService;

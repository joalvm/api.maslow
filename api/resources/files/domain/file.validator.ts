import { z } from 'zod';

import { Bucket } from './file-bucket.enum';

const baseFile = z.object({
    file: z.instanceof(File).or(z.instanceof(Blob)),
    generatedAt: z.date().optional(),
});

const userAvatarFile = baseFile.merge(
    z.object({
        bucket: z.literal<Bucket.USER_AVATARS>(Bucket.USER_AVATARS),
    }),
);

const attentionFile = baseFile.merge(
    z.object({
        bucket: z.literal<Bucket.ATTENTIONS>(Bucket.ATTENTIONS),
        clientId: z.number().positive(),
        incidenceId: z.number().positive(),
        attentionId: z.number().positive(),
    }),
);

const binnacleFile = baseFile.merge(
    z.object({
        bucket: z.literal<Bucket.BINNACLES>(Bucket.BINNACLES),
        clientId: z.number().positive(),
        incidenceId: z.number().positive(),
        attentionId: z.number().positive(),
        binnacleId: z.number().positive(),
    }),
);

export const fileValidator = z.discriminatedUnion('bucket', [userAvatarFile, attentionFile, binnacleFile]);

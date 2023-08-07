import { z } from 'zod';

export const clientValidator = z.object({
    name: z.string().min(3),
    business_name: z.string().min(3),
    address: z.string(),
    phone: z.string().optional().nullish(),
    email: z.string().email(),
    taxpayer_code: z.string(),
    logo_url: z.string().optional().nullish(),
    enabled: z.boolean().default(true),
});

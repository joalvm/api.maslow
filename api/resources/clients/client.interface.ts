export type Client = {
    id: number;
    name: string;
    business_name: string;
    address: string;
    phone: string;
    email: string;
    taxpayer_code: string;
    logo_url?: string | null;
    enabled?: boolean;
    created_at: string;
    updated_at: string;
};

export type ClientBasic = Omit<Client, 'created_at' | 'updated_at' | 'taxpayer_code' | 'email' | 'phone'>;

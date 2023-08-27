export type User = {
    first_name: string;
    last_name: string;
    user_name: string;
    is_seller: boolean;
    phone_number: string;
    avatar?: string;
    is_verified: boolean;
    role: string;
    address: any[];
    createdAt: Date;
    updatedAt: Date;
};

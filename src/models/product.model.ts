export type Product = {
    _id: string;
    name: string;
    images: string[];
    rating: number;
    total_ratings: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    short_description: string;
    default_variant: string;
};

export type ProductVariant = {
    _id: string;
    price: number;
    images: string[];
    stock: number;
    product: string;
    attributes: {
        attribute: {
            _id: string;
            name: string;
        };
        value: {
            _id: string;
            name: string;
        };
        _id: string;
    }[];
    __v: 0;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductDetails = {
    _id: string;
    name: string;
    short_description: string;
    description: string;
    category: {
        category: {
            _id: string;
            name: string;
        };
        _id: string;
    }[];
    images: string[];
    rating: number;
    total_ratings: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
    variants: ProductVariant[];
    default_variant: string;
};

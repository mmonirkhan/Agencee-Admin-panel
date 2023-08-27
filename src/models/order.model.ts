export type OrderProduct = {
    product: {
        _id: string;
        name: string;
        images: [];
    };
    variant: {
        _id: string;
        price: number;
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
    };
    quantity: number;
    unit_price: number;
    _id: string;
};

export type Order = {
    _id: string;
    user: {
        _id: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        avatar?: string;
        user_name: string;
    };
    products: OrderProduct[];
    sub_total_price: number;
    total_price: number;
    discount: {
        code: string;
        amount: number;
    };
    shipping_address: {
        name: string;
        phone_number: string;
        street: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    payment_method: "cod";

    payment_status: "pending" | "paid" | "failed" | "refunded";
    delivery_status: "pending" | "delivered" | "returned" | "cancelled";
    order_status: "pending" | "processing" | "completed" | "cancelled";
    delivery_charge: number;
};

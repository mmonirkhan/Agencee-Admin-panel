import { create } from "zustand";
import { Product } from "../models/product.model";
import { getAllProduct } from "../services/product.service";

type State = {
    products: {
        loading: boolean;
        data: Product[];
        error?: string;
    };
};

type Action = {
    fetchProducts: () => void;
    updateProduct: (product: Product) => void;
};

// Create your store, which includes both state and (optionally) actions
const useProductStore = create<State & Action>((set) => ({
    products: {
        loading: false,
        data: [],
    },
    fetchProducts: async () => {
        set((state) => ({ products: { ...state.products, loading: true } }));
        try {
            const products = await getAllProduct();
            set(() => ({
                products: { loading: false, data: products.data },
            }));
        } catch (error: any) {
            set((state) => ({
                products: {
                    ...state.products,
                    loading: false,
                    error: error.message,
                },
            }));
        }
    },
    updateProduct: async (product) => {
        set((state) => ({
            products: {
                ...state.products,
                data: state.products.data.map((item) =>
                    item._id === product._id ? product : item
                ),
            },
        }));
    },
}));

export default useProductStore;

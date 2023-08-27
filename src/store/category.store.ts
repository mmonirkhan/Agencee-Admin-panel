import { create } from "zustand";
import type { Category } from "../models/category.model";
import { getAllCategory } from "../services/category.service";

type State = {
    categories: {
        loading: boolean;
        data: Category[];
        error?: string;
    };
};

type Action = {
    fetchCategories: () => void;
    addCategory: (category: Category) => void;
};

const useCategoryStore = create<State & Action>((set) => ({
    categories: {
        loading: false,
        data: [],
    },
    fetchCategories: async () => {
        set((state) => ({
            categories: { ...state.categories, loading: true },
        }));
        try {
            const categories = await getAllCategory();
            set(() => ({
                categories: { loading: false, data: categories.data },
            }));
        } catch (error: any) {
            set((state) => ({
                categories: {
                    ...state.categories,
                    loading: false,
                    error: error.message,
                },
            }));
        }
    },
    addCategory: (category) => {
        set((state) => ({
            categories: {
                ...state.categories,
                data: [...state.categories.data, category],
            },
        }));
    },
}));

export default useCategoryStore;

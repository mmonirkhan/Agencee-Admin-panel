import { create } from "zustand";
import { Order } from "../models/order.model";
import { getAllOrderService } from "../services/order.service";

type State = {
    order: {
        loading: boolean;
        data: Order[];
        error?: string;
    };
};

type Action = {
    fetchOrder: () => void;
};

// Create your store, which includes both state and (optionally) actions
const useOrderStore = create<State & Action>((set) => ({
    order: {
        loading: false,
        data: [],
    },
    fetchOrder: async () => {
        set((state) => ({
            order: { ...state.order, loading: true },
        }));
        try {
            const result = await getAllOrderService();
            set({
                order: {
                    loading: false,
                    data: result.data,
                },
            });
        } catch (error: any) {
            set((state) => ({
                order: {
                    ...state.order,
                    loading: false,
                    error: error.message,
                },
            }));
        }
    },
}));

export default useOrderStore;

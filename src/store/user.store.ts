import { create } from "zustand";
import { User } from "../models/user.model";
import { getAllUserService } from "../services/user.service";

type State = {
    user: {
        loading: boolean;
        data: User[];
        error?: string;
    };
};

type Action = {
    fetchUsers: () => void;
};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<State & Action>((set) => ({
    user: {
        loading: false,
        data: [],
    },
    fetchUsers: async () => {
        set((state) => ({
            user: { ...state.user, loading: true },
        }));
        try {
            const result = await getAllUserService();
            set({
                user: {
                    loading: false,
                    data: result.data,
                },
            });
        } catch (error: any) {
            set((state) => ({
                user: {
                    ...state.user,
                    loading: false,
                    error: error.message,
                },
            }));
        }
    },
}));

export default useUserStore;

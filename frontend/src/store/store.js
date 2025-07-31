import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const useStore = create((set, get) => ({
    actors: [],
    loading: false,
    error: null,
    fetchActors: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get("/actors");
            console.log("response",response.data);
            set({ actors: response.data, loading: false });
        } catch (error) {
            console.error("Error fetching actors:", error);
            set({ loading: false, error: error.message });
            toast.error("Failed to fetch actors");
        }
    },
}));
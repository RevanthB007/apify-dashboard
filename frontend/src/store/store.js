import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useStore = create((set, get) => ({
  response: {},
  latestResult: {},
  loading: false,
  error: null,
  inputParams: {},
  result: null,

  login: async (apiKey) => {
    try {
      const response = await axiosInstance.get("/login", { apiKey });
    } catch (error) {
      console.log("Error during login:", error);
      toast.error("Invalid API Key");
    }
  },

  fetchActors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/actors");
      console.log("response", response.data);
      set({ response: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching actors:", error);
      set({ loading: false, error: error.message });
      toast.error("Failed to fetch actors");
    }
  },

  fetchInputParams: async (actorId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/actors/schema/${actorId}`);
      console.log("Input parameters fetched successfully:", response.data);
      set({ inputParams: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching input parameters:", error);
      set({ loading: false, error: error.message });
    }
  },

  runActor: async (actorId, input) => {
    set({ loading: true, error: null }); // Clear previous errors
    try {
      const response = await axiosInstance.post(
        `/actors/run/${actorId}`,
        input
      );
      set({ loading: false }); // Set loading to false on success
      console.log("Actor run started successfully:", response.data); // Return the data for use in components
      //   set({ result: [...get().results,response.data] });
    } catch (error) {
      console.error("Error running actor:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      set({ loading: false, error: errorMessage });
      throw error; // Re-throw so calling component can handle it
    }
  },

  // getLatestResult: async (actorId) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await axiosInstance.get(`/runs/result/${actorId}`);
  //     console.log("Run result fetched successfully:", response.data);
  //     set({ loading: false, result: response.data.data , });
  //   } catch (error) {
  //     console.error("Error fetching run result:", error);
  //     set({ loading: false, error: error.message });
  //     toast.error("Failed to fetch run result");
  //   }
  // },

  getLatestResult: async (actorId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/runs/result/${actorId}`);
      console.log("Run result fetched successfully:", response.data);

      const scrapedData = response.data.scrapedData || null;
      console.log("Scraped data:", scrapedData);
      set({
        loading: false,
        result: response.data.data,
        scrapedData: scrapedData,
      });
    } catch (error) {
      console.error("Error fetching run result:", error);
      set({
        loading: false,
        error: error.message,
        scrapedData: null,
      });
      toast.error("Failed to fetch run result");
    }
  },


  getRuns: async (actorId) => {},

}));

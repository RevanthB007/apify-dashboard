
import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useStore = create((set, get) => ({
  response: {},
  latestResult: {},
  scrapedData: null, // Store the actual scraped data
  loading: false,
  error: null,
  inputParams: {},
  result: null,

  login: async (apiKey) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/login", { apiKey });
      set({ loading: false });
      toast.success("Successfully logged in!");
      return response.data;
    } catch (error) {
      console.log("Error during login:", error);
      set({ loading: false, error: error.message });
      toast.error("Invalid API Key");
      throw error;
    }
  },

  fetchActors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/actors");
      console.log("response", response.data);
      set({ response: response.data, loading: false });
      toast.success("Actors loaded successfully!");
    } catch (error) {
      console.error("Error fetching actors:", error);
      set({ loading: false, error: error.message });
      toast.error("Failed to fetch actors");
      throw error;
    }
  },

  fetchInputParams: async (actorId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/actors/schema/${actorId}`);
      console.log("Input parameters fetched successfully:", response.data);
      set({ inputParams: response.data, loading: false });
      toast.success("Input parameters loaded!");
    } catch (error) {
      console.error("Error fetching input parameters:", error);
      set({ loading: false, error: error.message });
      toast.error("Failed to fetch input parameters");
      throw error;
    }
  },

  runActor: async (actorId, input) => {
    set({ loading: true, error: null, scrapedData: null });
    try {
      const response = await axiosInstance.post(`/actors/run/${actorId}`, input);
      console.log("Actor run completed successfully:", response.data);
      
      // runActor response structure: { runInfo, status, dataCount, data }
      const { data: scrapedData, runInfo, status, dataCount } = response.data;
      console.log(scrapedData)
      set({ 
        loading: false,
        result: runInfo, // Store run metadata
        scrapedData: scrapedData // Store the actual scraped data
      });
      
      if (scrapedData && Array.isArray(scrapedData) && scrapedData.length > 0) {
        toast.success(`Actor completed successfully! Found ${scrapedData.length} items.`);
      } else {
        toast.success("Actor completed successfully, but no data was scraped.");
      }
      
      return response.data;
    } catch (error) {
      console.error("Error running actor:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      set({ loading: false, error: errorMessage, scrapedData: null });
      toast.error(`Failed to run actor: ${errorMessage}`);
      throw error;
    }
  },

  getLatestResult: async (actorId) => {
    set({ loading: true, error: null, scrapedData: null });
    try {
      const response = await axiosInstance.get(`/runs/result/${actorId}`);
      console.log("Latest result fetched successfully:", response.data);
      
      // The backend currently only returns run metadata: { data: { ...runMetadata } }
      // No scraped data is included in this response
      const runData = response.data.data;
      
      set({ 
        loading: false, 
        result: runData,
        scrapedData: null // No scraped data available from this endpoint
      });
      
      toast.info("Latest result loaded. Note: Scraped data not available via this method.");
      
      return response.data;
    } catch (error) {
      console.error("Error fetching latest result:", error);
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred";
      set({ loading: false, error: errorMessage, scrapedData: null });
      toast.error(`Failed to fetch latest result: ${errorMessage}`);
      throw error;
    }
  },

  getRunResult: async (runId) => {
    set({ loading: true, error: null, scrapedData: null });
    try {
      const response = await axiosInstance.get(`/runs/result/run/${runId}`);
      console.log("Run result fetched successfully:", response.data);
      
      // Similar structure handling as getLatestResult
      const runData = response.data.data;
      
      set({ 
        loading: false, 
        result: { ...runData, runId },
        scrapedData: null // No scraped data available from this endpoint
      });
      
      toast.info("Run result loaded. Note: Scraped data not available via this method.");
      
      return response.data;
    } catch (error) {
      console.error("Error fetching run result:", error);
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred";
      set({ loading: false, error: errorMessage, scrapedData: null });
      toast.error(`Failed to fetch run result: ${errorMessage}`);
      throw error;
    }
  },

  // Clear scraped data when needed
  clearScrapedData: () => {
    set({ scrapedData: null });
  },

  getRuns: async (actorId) => {
    // TODO: Implement this method
  }
}));
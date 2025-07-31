import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
dotenv.config(); // Ensure environment variables are loaded
const apifyClient = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

export default apifyClient
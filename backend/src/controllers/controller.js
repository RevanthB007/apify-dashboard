import axios from "axios";
import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
dotenv.config();

// const apifyClient = new ApifyClient({ token: req.apifyToken });

export const login = async (req, res) => {

  const { apitoken } = req.params

  try {
    const response = await axios.get("https://api.apify.com/v2/me", {
      headers: {
        Authorization: `Bearer ${apitoken}`,
      },
    });
    console.log("Login successful:", response.data);
    return res.status(200).json({ message: "Login successful" });
  }
  catch (error) {
    console.error("Error during login:", error);
    return res.status(401).json({ message: "Invalid API Key" });
  }



}
export const getActors = async (req, res) => {
  try {
    const client = new ApifyClient({ token: req.apifyToken });
    const actorCollectionClient = client.actors();
    const actors = await actorCollectionClient.list();
    console.log("Actors fetched successfully:", actors);
    res.status(200).json(actors);
  } catch (error) {
    console.error("Error fetching actors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// export const getActors = async (req, res) => {
//   try {
//     if(!req.apifyToken) {
//       console.error("APIFY_API_TOKEN is not set");
//       return res.status(500).json({ error: "Server configuration error" });
//     }

//     const queryParams = new URLSearchParams({
//       token: req.apifyToken,
//       my:1
//     });
//     console.log("fetching actors")

//     const response = await axios.get("https://api.apify.com/v2/acts?"+queryParams);
//     console.log("Actors fetched successfully:", response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching actors:", error.message || error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// }


export const runActor = async (req, res) => {
  try {
    const { actorId } = req.params;
    console.log("Running actor with ID:", actorId);

    // Check if actorId exists
    if (!actorId) {
      return res.status(400).json({ error: "Actor ID is required" });
    }

    // Check if req.body exists and has content
    if (!req.body) {
      console.error("Request body is undefined");
      return res.status(400).json({ error: "Request body is required" });
    }

    const input = req.body;
    console.log("Request body:", JSON.stringify(input, null, 2));

    // Validate environment variable
    if (!req.apifyToken) {
      console.error("APIFY_API_TOKEN is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const run = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${req.apifyToken}`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("Actor run started successfully:", run.data);
    res.status(200).json(run.data);
  } catch (error) {
    console.error("Error running actor:", error);

    if (error.response) {
      // Apify API returned an error
      console.error("Apify API error details:", error.response.data);
      console.error("Apify API status:", error.response.status);

      res.status(error.response.status).json({
        error: error.response.data?.message || "Apify API error",
        details: error.response.data,
      });
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.message);
      res.status(503).json({ error: "Service unavailable - network error" });
    } else {
      // Other error
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// export const getRunResult = async (req, res) => {
//   const actorId = req.params.actorId;
//   try {
//     // Get the latest successful run using the /last endpoint
//     const runResult = await axios.get(
//       `https://api.apify.com/v2/acts/${actorId}/runs/last?token=${req.apifyToken}&status=SUCCEEDED`
//     );

//     console.log("Latest successful run fetched:", runResult.data);
//     console.log("default dataset", runResult.data.data.defaultDatasetId);
//     res.status(200).json(runResult.data);
    
//   } catch (error) {
//     console.error("Error fetching latest successful run:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getRunResult = async (req, res) => {
  const actorId = req.params.actorId;
  try {
    // Get the latest successful run using the /last endpoint
    const runResult = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs/last?token=${req.apifyToken}&status=SUCCEEDED`
    );

    console.log("Latest successful run fetched:", runResult.data);
    
    // Extract the dataset ID from the run result (note the nested structure)
    const defaultDatasetId = runResult.data.data.defaultDatasetId;
    console.log("Default dataset ID:", defaultDatasetId);

    // If dataset ID exists, fetch the scraped data
    let scrapedData = null;
    if (defaultDatasetId) {
      try {
        const datasetResponse = await axios.get(
          `https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${req.apifyToken}&format=json&clean=true`
        );
        
        scrapedData = datasetResponse.data;
        console.log("Scraped data retrieved successfully:");
        console.log(`- Total items: ${scrapedData.length}`);
        console.log("- Sample data (first item):", scrapedData[0] || "No items found");
        
      } catch (datasetError) {
        console.error("Error fetching dataset items:", datasetError);
        // Don't fail the entire request if dataset fetch fails
        scrapedData = { error: "Failed to fetch dataset items" };
      }
    } else {
      console.log("No dataset ID found in run result");
    }
    runResult.data.scrapedData = scrapedData[0]; // Attach scraped data to the run result
    // Return both run info and scraped data
    res.status(200).json(
      runResult.data
    );

  } catch (error) {
    console.error("Error fetching latest successful run:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getActorSchema = async (req, res) => {
  const actorId = req.params.actorId;

  if (!actorId) {
    return res
      .status(400)
      .json({ error: "Missing actorId in request parameters." });
  }

  try {
    const inputSchema = await axios.get(
      `https://api.apify.com/v2/key-value-stores/2U05nMFEv8AnXSDCf/records/INPUT?token=${req.apifyToken}`
    );

    console.log("Input schema fetched successfully:", inputSchema);
    if (!inputSchema) {
      return res
        .status(404)
        .json({ error: "No input schema defined for this actor" });
    }

    res.status(200).json(inputSchema.data);
  } catch (error) {
    console.error("Error fetching actor schema:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; //review again

export const findActorById = async (req, res) => {
  const actorId = req.params.actorId;
  console.log("Finding actor by ID:", actorId);
  if (!actorId) {
    return res
      .status(400)
      .json({ error: "Missing actorId in request parameters." });
  }
  try {
    const client = new ApifyClient({ token: req.apifyToken });
    const actor = await client.actor(actorId).get();
    console.log("Actor found:", actor);
    res.status(200).json(actor);
  } catch (error) {
    console.error("Error finding actor by ID:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
    throw error;
  }
};

export const getRuns = async (req, res) => {
  const { actorId } = req.params; // Fixed: removed .actorId
  console.log("Fetching runs for actor ID:", actorId);

  if (!actorId) {
    return res
      .status(400)
      .json({ error: "Missing actorId in request parameters." });
  }

  try {
    const runs = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${req.apifyToken}` // Fixed: using dynamic actorId
    );

    console.log("Runs fetched successfully:", runs.data);
    res.status(200).json(runs.data);
  } catch (error) {
    console.error("Error fetching runs for actor ID:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
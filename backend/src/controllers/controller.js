import axios from "axios";
import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
dotenv.config();


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


// export const runActor = async (req, res) => {
//   try {
//     const { actorId } = req.params;
//     console.log("Running actor with ID:", actorId);

//     // Check if actorId exists
//     if (!actorId) {
//       return res.status(400).json({ error: "Actor ID is required" });
//     }

//     // Check if req.body exists and has content
//     if (!req.body) {
//       console.error("Request body is undefined");
//       return res.status(400).json({ error: "Request body is required" });
//     }

//     const input = req.body;
//     console.log("Request body:", JSON.stringify(input, null, 2));

//     // Validate environment variable
//     if (!req.apifyToken) {
//       console.error("APIFY_API_TOKEN is not set");
//       return res.status(500).json({ error: "Server configuration error" });
//     }

//     const run = await axios.post(
//       `https://api.apify.com/v2/acts/${actorId}/runs?token=${req.apifyToken}`,
//       input,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         timeout: 30000,
//       }
//     );

//     console.log("Actor run started successfully:", run.data);
//     res.status(200).json(run.data);
//   } catch (error) {
//     console.error("Error running actor:", error);

//     if (error.response) {
//       // Apify API returned an error
//       console.error("Apify API error details:", error.response.data);
//       console.error("Apify API status:", error.response.status);

//       res.status(error.response.status).json({
//         error: error.response.data?.message || "Apify API error",
//         details: error.response.data,
//       });
//     } else if (error.request) {
//       // Network error
//       console.error("Network error:", error.message);
//       res.status(503).json({ error: "Service unavailable - network error" });
//     } else {
//       // Other error
//       console.error("Unexpected error:", error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };

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

    // Start the actor run
    console.log("Starting actor run...");
    const runResponse = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${req.apifyToken}`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const runId = runResponse.data.data.id;
    console.log("Actor run started with ID:", runId);

    // Wait for the run to complete
    console.log("Waiting for run to complete...");
    
    const waitForCompletion = async (runId, token, maxWaitTime = 300000) => {
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWaitTime) {
        const statusResponse = await axios.get(
          `https://api.apify.com/v2/actor-runs/${runId}?token=${token}`,
          { timeout: 10000 }
        );
        
        const runData = statusResponse.data.data;
        const status = runData.status;
        
        console.log(`Run status: ${status}`);
        
        if (status === "SUCCEEDED" || status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") {
          return runData;
        }
        
        // Wait 3 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      throw new Error("Run timeout - actor took too long to complete");
    };

    const finalRunData = await waitForCompletion(runId, req.apifyToken);

    // Check if run was successful
    if (finalRunData.status !== "SUCCEEDED") {
      throw new Error(`Actor run failed with status: ${finalRunData.status}`);
    }

    // Retrieve the scraped data
    console.log("Retrieving scraped data...");
    const dataResponse = await axios.get(
      `https://api.apify.com/v2/datasets/${finalRunData.defaultDatasetId}/items?token=${req.apifyToken}`,
      { timeout: 30000 }
    );

    const scrapedData = dataResponse.data;
    console.log(`Successfully retrieved ${scrapedData.length} items`);
    console.log("Scraped data:", scrapedData);
    // Return the complete response with run info and scraped data
    res.status(200).json({
      runInfo: finalRunData,
      status: finalRunData.status,
      dataCount: scrapedData.length,
      data: scrapedData
    });

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
      // Other error (including timeout)
      console.error("Unexpected error:", error.message);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
};

export const getRunResult = async (req, res) => {
  const actorId = req.params.actorId;
  try {
    // Get the latest successful run using the /last endpoint
    const runResult = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs/last?token=${req.apifyToken}&status=SUCCEEDED`
    );

    console.log("Latest successful run fetched:", runResult.data);
    res.status(200).json(runResult.data);
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

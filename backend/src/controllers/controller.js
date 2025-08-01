import axios from "axios";
import apifyClient from "../apify/apify.js";
import dotenv from "dotenv";
dotenv.config();

// const apifyClient = new ApifyClient({ token: req.apifyToken });

export const login = async (req, res) => {
  try{
  const response = await axios.get("https://api.apify.com/v2/me", {
    headers: {
      Authorization: `Bearer ${req.headers.authorization}`,
    },
  });
  console.log("Login successful:", response.data);
  return res.status(200).json({ message: "Login successful"});
}
catch(error){
  console.error("Error during login:", error);
  return res.status(401).json({ message: "Invalid API Key" });
}


  
}
export const getActors = async (req, res) => {
  try {
    const actorCollectionClient = apifyClient.actors();
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
//     if(!process.env.APIFY_API_TOKEN) {
//       console.error("APIFY_API_TOKEN is not set");
//       return res.status(500).json({ error: "Server configuration error" });
//     }

//     const queryParams = new URLSearchParams({
//       token: process.env.APIFY_API_TOKEN,
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
    if (!process.env.APIFY_API_TOKEN) {
      console.error("APIFY_API_TOKEN is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const run = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${process.env.APIFY_API_TOKEN}`,
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

export const getRunResult = async (req, res) => {
  const actorId = req.params.actorId;
  try {
    // Get the latest successful run using the /last endpoint
    const runResult = await axios.get(
      `https://api.apify.com/v2/acts/${actorId}/runs/last?token=${process.env.APIFY_API_TOKEN}&status=SUCCEEDED`
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
      `https://api.apify.com/v2/key-value-stores/2U05nMFEv8AnXSDCf/records/INPUT?token=${process.env.APIFY_API_TOKEN}`
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
    const actor = await apifyClient.actor(actorId).get();
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
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${process.env.APIFY_API_TOKEN}` // Fixed: using dynamic actorId
    );

    console.log("Runs fetched successfully:", runs.data);
    res.status(200).json(runs.data);
  } catch (error) {
    console.error("Error fetching runs for actor ID:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import apifyClient from "../apify/apify.js";

// const apifyClient = new ApifyClient({ token: req.apifyToken });

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

export const runActor = async (req, res) => {
  const { actorId } = req.params;
  // const input = req.body; //handle error: req.body is undefined
  try {
    const actorClient = apifyClient.actor(actorId);
    // { input }
    const myActorRun = await actorClient.start();
    console.log("Actor run started successfully:", myActorRun);
    res.status(200).json(myActorRun);
  } catch (error) {
    console.error("Error running actor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRunResult = async (req, res) => {
  const  runId  = req.params.runId;
  try {
    const runDetails = await apifyClient.run(runId).get();
    if (!runDetails || !runDetails.status) {
      res.status(404).json({ error: "Run not found" });
    }
    console.log("Run details fetched successfully:", runDetails);
    if (runDetails.status === "SUCCEEDED") {
      const runResult = await apifyClient.run(runId).getData();
      console.log("Run result fetched successfully:", runResult);
      res.status(200).json(runResult);
    } else {
      console.log("Run is not successful, status:", runDetails.status);
      res
        .status(200)
        .json({ message: "Run is not successful", status: runDetails.status });
    }
  } catch (error) {
    console.error("Error fetching run result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getActorSchema = async (req, res) => {
  const actorId = req.params.actorId;

  if (!actorId) {
    return res.status(400).json({ error: "Missing actorId in request parameters." });
  }

  try {
    const actor = await apifyClient.actor(actorId).get();

    // Check if schema exists
    const inputSchema = actor?.inputSchema;
    if (!inputSchema) {
      return res.status(404).json({ error: "Input schema not found for this actor." });
    }

    console.log("Actor schema fetched successfully:", inputSchema);
    res.status(200).json(inputSchema);
  } catch (error) {
    console.error("Error fetching actor schema:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; //review again


export const findActorById = async (req, res) => {
  const  actorId  = req.params.actorId;
  console.log("Finding actor by ID:", actorId);
  if (!actorId) {
    return res.status(400).json({ error: "Missing actorId in request parameters." });
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

// export const getActorSchema = async (req, res) => {
//   const { actorId } = req.params;
//   try {
//     // Try the direct schema endpoint
//     const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/input-schema`, {
//       headers: {
//         'Authorization': `Bearer ${process.env.APIFY_API_TOKEN}`
//       }
//     });
    
//     if (response.ok) {
//       const schema = await response.json();
//       console.log("Actor schema:", JSON.stringify(schema, null, 2));
//       res.status(200).json(schema);
//     } else if (response.status === 404) {
//       // No schema defined for this actor
//       res.status(404).json({ 
//         error: "No input schema defined for this actor",
//         message: "Actor may still accept input, check documentation or use fallback"
//       });
//     } else {
//       throw new Error(`API responded with status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error fetching actor schema:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
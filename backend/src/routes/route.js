import express from 'express';
import { getActors, runActor,getRunResult,getActorSchema,findActorById } from '../controllers/controller.js';
import { authTokenMiddleware } from '../middlewares/middleware.js';
const router = express.Router();

router.get("/actors",getActors);
router.get("/actors/:actorId",authTokenMiddleware,findActorById);

router.get("/actors/schema/:actorId",authTokenMiddleware,  getActorSchema);

router.post("/actors/run/:actorId",authTokenMiddleware,runActor);
router.get("/runs/result/:runId",authTokenMiddleware,getRunResult);

export default router
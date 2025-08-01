import express from 'express';
import { getActors, runActor,getRunResult,getActorSchema,findActorById,getRuns ,login } from '../controllers/controller.js';
import { authTokenMiddleware } from '../middlewares/middleware.js';
const router = express.Router();

router.get("/actors",getActors);
router.get("/actors/:actorId",findActorById);

router.get("/actors/schema/:actorId",  getActorSchema);

router.post("/actors/run/:actorId",runActor); //to run an actor
router.get("/runs/result/:actorId",getRunResult); //to get the result of a run

router.get("/runs/results/:actorId",getRuns); //to get all runs of an actor

router.post("/login", login)


export default router
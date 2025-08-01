import express from 'express';
import { getActors, runActor,getRunResult,getActorSchema,findActorById,getRuns ,login } from '../controllers/controller.js';
import { authTokenMiddleware } from '../middlewares/middleware.js';
const router = express.Router();

router.get("/actors", authTokenMiddleware, getActors);
router.get("/actors/:actorId", authTokenMiddleware, findActorById);
router.get("/actors/schema/:actorId", authTokenMiddleware, getActorSchema);
router.post("/actors/run/:actorId", authTokenMiddleware, runActor);
router.get("/runs/result/:actorId", authTokenMiddleware, getRunResult);
router.get("/runs/results/:actorId", authTokenMiddleware, getRuns);


router.post("/login/:apitoken", login)


export default router
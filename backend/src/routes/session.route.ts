import { Router } from "express";
import { deleteSessionHandler, getSessionsHandler } from "../controllers/session.controller";


const sessionRoutes = Router();

// prefix: /sessions
sessionRoutes.get("/", getSessionsHandler);
sessionRoutes.delete("/:sessionId", deleteSessionHandler);

export default sessionRoutes;
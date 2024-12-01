import { Router } from "express";
import { getUserHandler } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.get('/', getUserHandler);
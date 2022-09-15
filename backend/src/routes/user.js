import { Router } from "express";
import * as UserController from "../controllers/UserController";

export const routes = Router();

routes.post("/register", UserController.register);

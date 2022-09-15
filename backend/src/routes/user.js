import { Router } from "express";
import * as UserController from "../controllers/UserController";
import isAuthenticated from "../middlewares/auth";

export const routes = Router();

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.post("/logout", isAuthenticated, UserController.logout);

import { Router } from "express";
import isAuthenticated from "../middlewares/auth";
import * as TodoController from "../controllers/TodoController";

export const routes = Router();

routes.post("/", isAuthenticated, TodoController.addTodo);

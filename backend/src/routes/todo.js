import { Router } from "express";
import * as TodoController from "../controllers/TodoController";

export const routes = Router();

routes.post("/", TodoController.addTodo);

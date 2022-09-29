import { Router } from "express";
import isAuthenticated from "../middlewares/auth";
import * as TodoController from "../controllers/TodoController";

export const routes = Router();

routes.post("/", isAuthenticated, TodoController.addTodo);
routes.get("/", isAuthenticated, TodoController.getTodos);
routes.put("/:id", isAuthenticated, TodoController.doneTodo);
routes.delete("/:id", isAuthenticated, TodoController.deleteTodo);

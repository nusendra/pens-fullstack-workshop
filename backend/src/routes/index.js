import { Router } from "express";

export const routes = Router();

routes.get("/", (req, res) => {
	res.send("welcome to my API");
});

routes.get("/todos", (req, res) => {
	const todos = [];
	res.send(todos);
});

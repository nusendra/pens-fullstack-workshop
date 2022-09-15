import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { UserRoutes, TodoRoutes } from "./src/routes";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/todos", TodoRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

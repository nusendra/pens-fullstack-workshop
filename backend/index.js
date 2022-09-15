import express from "express";
import * as dotenv from "dotenv";
import { UserRoutes } from "./src/routes";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/users", UserRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

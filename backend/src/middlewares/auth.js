import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return next("Please login to access the data");
		}

		const verify = jwt.verify(token, process.env.SECRET_KEY);
		req.user = await prisma.user.findUnique({ where: { email: verify.email } });
		next();
	} catch (error) {
		return next(error);
	}
};

export default isAuthenticated;

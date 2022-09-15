import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).send("missing parameters");
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		return res.cookie("token", token).json({
			success: true,
			message: "User successfully registered",
			data: user,
			token,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);

		if (!email || !password) {
			return res.status(400).send("missing parameters");
		}

		// check user existence
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(404).send("email not found");
		}

		//Check password match
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			return res.status(401).send("wrong password");
		}

		const token = jwt.sign({ email }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRE,
		});
		console.log(token);
		return res
			.cookie("token", token)
			.json({ success: true, message: "LoggedIn Successfully" });
	} catch (error) {
		return res.json({ error: error });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token");
	return res.json({ success: true, message: "logged out" });
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400).send("missing parameters");
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
};

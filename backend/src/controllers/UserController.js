import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
	console.log("as");
	console.log(req.body);
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
		return res.send("create sukses", user);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

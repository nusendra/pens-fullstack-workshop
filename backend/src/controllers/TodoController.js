import Todo from "../db/nosql-models/Todo";

export const addTodo = async (req, res) => {
	try {
		const { description } = req.body;
		const todo = await Todo.findOneAndUpdate(
			{ userId: req.user.id },
			{ $push: { todos: { description, isDone: false } } },
			{ new: true, upsert: true }
		);

		return res.send(todo);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

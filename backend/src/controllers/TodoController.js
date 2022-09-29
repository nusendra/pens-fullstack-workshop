import Todo from "../db/nosql-models/Todo";

export const addTodo = async (req, res) => {
	try {
		const { task } = req.body;
		const todo = await Todo.findOneAndUpdate(
			{ userId: req.user.id },
			{ $push: { todos: { task, isDone: false } } },
			{ new: true, upsert: true }
		);

		return res.send(todo);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

export const getTodos = async (req, res) => {
	try {
		const todos = await Todo.findOne({
			userId: req.user.id,
		}).exec();

		if (todos) {
			return res.status(200).send(todos);
		}
		return res.send([]);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const result = await Todo.updateOne(
			{ userId: req.user.id },
			{
				$pull: {
					todos: { _id: req.params.id },
				},
			}
		);

		return res.status(200).send(result);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

export const doneTodo = async (req, res) => {
	try {
		const todo = await Todo.updateOne(
			{ userId: req.user.id, "todos._id": req.params.id },
			{
				$set: {
					"todos.$.isDone": true,
				},
			}
		);

		return res.send(todo);
	} catch (error) {
		res.status(500).send("Something broke!");
		throw new Error(error);
	}
};

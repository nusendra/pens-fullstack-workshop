import mongoose from "mongoose";

const schema = mongoose.Schema({
	userId: Number,
	todos: [{ task: String, isDone: Boolean }],
});

export default mongoose.model("Todo", schema);

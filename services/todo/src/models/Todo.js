import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const Todos = Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

Todos.pre(`save`, function (callback) {
  this.updated = new Date(Date.now());
  callback();
});

const TodoModel = mongoose.model(`Todos`, Todos);

export default TodoModel;

import TodoModel from "../models/Todo.js";

const controller = {};

controller.getTodoList = async (req, res) => {
  try {
    const data = await TodoModel.find().exec();
    res.render("todo-list", { todos: data });
  } catch {
    res.render("404");
  }
};

controller.addTodo = async (req, res) => {
  res.render("add-todo");
};

controller.addTodoSave = async (req, res) => {
  await new TodoModel({
    name: req.body.name,
  }).save();
  res.redirect("todo-list");
};

controller.deleteTodoSave = async (req, res) => {
  await TodoModel.deleteOne({ _id: req.params.id });
  res.redirect("/todo-list");
};

export default controller;

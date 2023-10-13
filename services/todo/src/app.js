import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import todoController from "./controllers/todoController.js";

mongoose.connect("mongodb://localhost:27017/learn-node-react", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/todo-list", todoController.getTodoList);

app.get("/add-todo", todoController.addTodo);
app.post("/save-todo", todoController.addTodoSave);
app.get("/delete-todo/:id", todoController.deleteTodoSave);

app.listen(3000);

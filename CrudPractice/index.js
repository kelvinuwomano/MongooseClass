const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let todo = require("./todo");

app.get("/", (req, res) => {
  res.status(200).json(todo);
});

app.post("/", (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  todo.push({
    id: todo.length + 1,
    title,
    description,
    status,
    priority,
    dueDate,
  });
  res.status(200).json({
    alert: "Todo Created",
  });
});

// Updatelist
app.patch("/:id", (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  let { id } = req.params;
  id = parseInt(id);

  const update = todo.find((e) => e.id === id);

  if (update) {
    if (title) update.title = title;
    if (description) update.description = description;
    if (status) update.status = status;
    if (priority) update.priority = priority;

    res.status(200).json({ messge: "udated", data: req.body });
  } else {
    res.status(404).json({ messge: "task does not exit" });
  }
});

app.delete("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const findTodo = todo.find((e) => e.id === id);
  console.log(findTodo);
  if (findTodo) {
    const deleteTodo = todo.filter((e) => e.id !== id);
    todo = deleteTodo;
    res.status(200).json({ messge: "Todo successfully deleted" });
  } else {
    res.status(400).json({ message: "No task to do on that path" });
  }
});

app.get("/:status", (req, res) => {
  let { status } = req.params;
  const getStatus = todo.filter((e) => e.status === status);
  res.status(200).json({ message: "Check for pending", data: getStatus });
});

app.get("/:dueDate", (req, res) => {
  let { dueDate } = req.params;
  const getDueDate = todo.filter((k) => k.dueDate === dueDate);
  res.status(200).json({ message: "Checking the due date", data: getDueDate });
});

app.delete("/", (req, res) => {
  todo = [];
  res.status(200).json({ message: "All items deleted", data: todo });
});

app.all("*", (req, res) => {
    res.status(404).json({message: "Route does not exist"});
});

app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`);
});
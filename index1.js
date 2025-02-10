const express = require('express');
const app = express();
const port = 4100;

app.use(express.json())

let todo = require("./CrudPractice/todo")

app.get("/", (req, res) =>{
    res.status(200).json(todo)
});

           // Add to List
app.post("/", (req, res) => {
    const {title, description, status, priority, dueDate} = req.body
    todo.push({id: todo.length + 1, title, description, status, priority, dueDate});
    res.status(200).json({message: "List added successfully"})
});

     /// Update list
app.patch("/:id", (req, res) => {
    const { title, description, status, priority} = req.body;
    let {id} = req.params;
    id = parseInt(id);

    const update = todo.find((e) => e.id === id);

    if (update) {
        if (title) update.title = title;
        if (description) update.description = description;
        if (status) update.status = priority;
        res.status(200).json({message: "Updated Successfully" data: req.body})
    } else {
        res.status(404).json({message: "Route does not exist"})
    }
});

  // Delete one item from the list
  app.delete("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const findTodo = todo.find((e) => e.id === id);
    console.log(findTodo);

    if (findTodo) {
        const deleteTodo = todo.filter((e) => e.id !== id);
        res.status(200).json({message: "List successfully deleted"})
    } else {
        res.status(400).json({message: "No task to do"})
    }
  });

  // get one item from a list

  app.get("/:priority", (req, res) => {
    let {priority} = req.params;
    const getPriority = todo.filter((e) => e.priority === priority);
    res.status(200).json({message: "Successfully gotten list"})
  });

  // delete all items from the list
  app.delete("/", (req, res) => {
    todo = [];
    res.status(200).json({message: "All items deleted successfully", data: todo})
  });

  app.listen(port, () => {
    console.log(`App is listening to http://localhost:${port}`);
  });

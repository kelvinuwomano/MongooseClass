const express = require('express')
const app = express()
const port = 6300

app.use(express.json())

let todoList = []

app.get("/", (req, res) => {
    res.status(200).json(todoList)
})

app.post("/", (req, res) => {
    const { Title, Content, Date, Time} = req.body;
    const checkIfDateExist = todoList.findIndex((e) => e.Date === Date);
  if (checkIfDateExist === -1) {
    if (Title && Content && Date && Time) {
      todoList.push({
        id: todoList.length + 1,
        Title,
        Content,
        Date,
        Time,
      });
      res.status(200).json({
        message: "List successfully created",
        todoList: { Title, Content, Date, Time },
      });
    } else {
      res.status(400).json({ message: "All field are required" });
    }
  } else {
    res.status(409).json({ message: "Date already exist" });
  }
});


app.get("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
  
    const getList = todoList.findIndex((e) => e.id === id);
    if (getUser === -1) {
      res.status(404).json({ message: "List not found" });
    } else {
      res
        .status(200)
        .json({ message: "List successfully found", data: users[getList] });
    }
  });

  app.delete("/:id", (req, res) => {
    const getList = users.filter((e) => e.id !== parseInt(req.params.id));
    todoList = getList;
  
    res.status(404).json({ messgae: "List successfully deleted" });
  });

  app.patch("/:id", (req, res) => {
    const getList = todoList.find((e) => e.id === parseInt(req.params.id));
  
    if (getList) {
      const { Title, Content, Date, Time } = req.body;
      if (Title) getUser.Title = Title;
      if (Content) getUser.Content = Content;
      if (Date) getUser.Date = Date;
      if (Time) getUser.Time = Time;
  
      res.status(201).json({ message: "List successfully updated" });
    } else {
      res.status(404).json({ message: "List not found" });
    }
  });
  
  app.all("*", (req, res) => {
    res.status(404).json({ message: "Route Does Not exist" });
  });
  
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
  


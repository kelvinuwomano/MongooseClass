const express = require("express");
const app = express();

const port = 4700;

let members = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "Right route"});
});

app.post("/", (req, res) => {
    const { name, age, gender} = req.body;
    if (name && age && gender) {
        members.push({
            id: members.length + 1,
            name,
            age,
            gender
        });
        res.status(200).json({message:"Member added successfully", members: {name, age, gender}});
    } else {
        res.status(400).json({message: "All field required"});
    }
});

app.patch("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const {name, age, gender} = req.body;
    const update = members.find((e) => e.id === id);
    if (update) {
        if (name) update.name = name;
        if (age) update.age = age;
        if (gender) update.gender = gender;;
        res.status(200).json({message: "Updated successfully", data: req.body})
    } else {
        res.status(404).json({message: "Route not found"});
    }
});

app.delete("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const find = members.find((e) => e.id === id);
    if (find) {
        const deleteMembers = members.filter((e) => e.id !== id);
        members = deleteMembers;
        res.status(200).json({message: "Deleted successfully"});
    } else {
        res.status(404).json({message: "Not found"});
    }
});

app.listen(port, () => {
    console.log(`App is listening to http://localhost:${port}`)
});

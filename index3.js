const express = require("express");
const app = express();

const port = 4400;

app.use(express.json());

let students = [];

app.get("/", (req, res) => {
    res.status(200).json(students)
});

app.post("/", (req, res) => {
    const { name, age, gender} = req.body;
    if (name && age && gender) {
       students.push({
        id: students.length + 1,
        name,
        age,
        gender
       });
       res.status(200).json({message: "Student successfully added", students: {name, age, gender}});
    } else {
        res.status(404).json({message: "All field required"});
    }
});

app.patch("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const {name, age, gender} = req.body;
    const updateStudents = students.find((e) => e.id === id);
    if (updateStudents) {
        if(name) updateStudents.name = name;
        if(age) updateStudents.age = age;
        if(gender) updateStudents.gender = gender;
        res.status(200).json({message: "Updated", data: req.body});
    } else {
        res.status(404).json({message: "Unable to update"})
    }
});

app.delete("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const findStudent = students.find((e) => e.id === id);
    if (findStudent) {
        const deleteStudent = students.filter((e) => e.id !== id);
        students = deleteStudent;
        res.status(200).json({message: "Deleted"})
    } else {
        res.status(400).json({message: "not found"})
    }
})

app.listen(port, () => {
    console.log(`App is listening to http://localhost:${port}`)
});
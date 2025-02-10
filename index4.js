const express = require("express");
const app = express();
const port = 4500;

app.use(express.json());

let patients = [];

app.get("/", (req, res) => {
    res.status(200).json(patients)
});

app.post("/", (req, res) => {
    const {name, age, gender, illness} = req.body;
    if (name && age && gender && illness) {
        patients.push({
            id: patients.length + 1,
            name,
            age,
            gender,
            illness
        });
        res.status(200).json({message: "Added successfully", patients: {name, age, gender, illness}});
    } else {
        res.status(200).json({message: "Unable to add patient"});
    }
});

app.patch("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const {name, age, gender, illness} = req.body;
    const updatePatients = patients.find((e) => e.id === id);
    if (updatePatients) {
        if(name) updatePatients.name = name;
        if(age) updatePatients.age = age;
        if(gender) updatePatients.gender = gender;
        if(illness) updatePatients.illness = illness;
        res.status(200).json({message: "Updated successfully", data: req.body});
    } else {
        res.status(404).json({message: "Unable to update"});
    }
});

app.delete("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);

    const findPatients = patients.find((e) => e.id === id);
    if (findPatients) {
        const deletePatient = patients.filter((e) => e.id !== id);
        patients = deletePatient;
        res.status(200).json({message: "Deleted successfully"});
    } else {
        res.status(404).json({message: "No patient to delete"});
    }
});

app.get("/:gender", (req, res) => {
    let {gender} = req.params;
    const getGender = patients.filter((e) => e.gender === gender);
    res.status(200).json({message: " Successfully gotten gender", data: getGender});
});

app.listen(port, () => {
    console.log(`App is listening to http://localhost:${port}`)
});
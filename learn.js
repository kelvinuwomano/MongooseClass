const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = process.env.port;

app.use(express.json());

mongoose
.connect()
.then(() => {
    console.log("Connected")
})
.catch((error) => {
    console.log("An error occured", error)
});

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    illness: String,
    condition: String,
});

const patientModel = mongoose.model("patient", PatientSchema);

app.get("/get-all-patients", async (req, res) => {
    try {
        const getAllPatients = await patientModel.find();
        res.status(200).json({status: true, getAllPatients})
    } catch (error) {
        res.status(400).json({status: false, error});
    }
});

app.post("/create-patient", async (req, res) => {
    try {
        const { name, age, illness, condition} = req.body;
        if (name && age && illness && condition) {
            patientModel.create({
                name,
                age,
                illness,
                condition,
            })
        }
        res.status(200).json({status: true})
    } catch (error) {
        res.status(500).json({status: false, error: error.message})
    }
});

app.

app.listen(port, () => {
    console.log("App is listening to port", port)
});
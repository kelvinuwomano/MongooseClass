const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const port = process.env.port;

const app = express();

app.use(express.json());

mongoose
.connect("mongodb://localhost:27017")
.then(() => {
    console.log("Connected");
})
.catch((err) => {
    console.log("An error occured in the data base", err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/get-all-users", async (req, res) => {
    try {
        const getAllUsers = await userModel.find();
        res.status(200).json({status: true, getAllUsers});
    } catch (error) {
        res.status(404).json({status: false, error});
    }
});

app.post("/create-user", async (req, res) => {
    try {
        const { name, email, password} = req.body;
        
        const checkIfUserExist = await userModel.findOne({email,});
        if (checkIfUserExist) {
            res.status(409).json({message: "User already exist"});
        }

        const user = await userModel.create({ name , email, password});
        res.status(200).json({status: true, user});
    } catch (error) {
        res.status(500).json({status: false, error: error.message});
    }
});

app.get("/login/:email", async (req, res) => {
    try {
        const { email, password} = req.body;

        const checkIfUserExist = await userModel.findOne({email});
        console.log(checkIfUserExist);
        
        if (!checkIfUserExist) {
            res.status(400).json({message: "Invalid Email or Password"});
        }
        const checkPassword = await userModel.findOne({ password});
        if (!checkPassword) {
            res.status(400).json({message: "Invalid Email or Password"});  
        }
        res.status(200).json({message: "Successful", user:{ name: checkIfUserExist.name, _id: checkIfUserExist._id, email: checkIfUserExist.email}})
    } catch (error) {
        res.status(500).json({message: "Route not found", error});   
    }
});

app.patch("/update-user/:id", async (req, res) => {
    try {
        const { name, email, password} =req.body;

        const updateUser = await userModel.findByIdAndUpdate(req.params.id,
            {
                name, email, password,
            },
            { new: true}
        );
        if (!updateUser) {
            res.status(404).json({message: "User not found"});
        };
        res.status(200).json({status: true, user: updateUser});
    } catch (error) {
        res.status(409).json({status: false, error: error.message});
    }
});

app.listen(port, () => {
    console.log("App is listening to port", port);
});
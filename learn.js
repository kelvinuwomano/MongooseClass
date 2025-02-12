const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5700;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/libaryDB")
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("An Error Occured", err);
  });

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    yearPublished: Number,
    category: String,
});

const bookModel = mongoose.model("book", BookSchema);

app.get("/", async (req, res) => {
    try {
        const getBooks = await bookModel.find();
        res.status(200).json({message: "Gottten all books", book: getBooks})
    } catch (error) {
        res.status(404).json({message:"Not found", error})
    }
});

app.get("/:id", async (req, res) => {
    try {
        let {id} = req.params;
        const getOneBook = await bookModel.findById(id);
        if (!getOneBook) {
            
        }
        res.status(200).json({message: "Gottten all books", book: getOneBook});
    } catch (error) {
        res.status(404).json({message: "Unable to get book", error});
    }
});

const date = new Date();

app.listen(port, () => {
    console.log(date.toDateString, port)
});
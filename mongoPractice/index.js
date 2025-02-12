const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5600;
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
    yearPublished: Number,
    category: String,
    author: String,
});

const bookModel = mongoose.model("book", BookSchema);

app.get("/", async (req, res) => {
    try {
        const getBooks = await bookModel.find();
        res.status(200).json({message: "All books gotten successfully", books: getBooks});
    } catch (error) {
        res.status(404).json({message: "Not found", error});
    }
});

app.post("/", async (req, res) => {
    try {
        const { title, yearPublished, category, author} = req.body;
        const postBook = await bookModel.create({
            title,
            yearPublished,
            category,
            author,
        });
        res.status(200).json({message: "Book added", data: postBook})
    } catch (error) {
        res.status(404).json({message: "unable to add", error});
    }
});

app.get("/:id", async (req, res) => {
    try {
        let {id} = req.params;
        const getOneBook = await bookModel.findById(id);
        if (!getOneBook) {
            res.status(404).json({message: "Book not found"})
        }
        res.status(200).json({message: "Book gotten", data: getOneBook})
    } catch (error) {
        res.status(500).json({message: "Bad request", error})
    }
});

app.patch("/:id", async (req, res) => {
    try {
        let {id} = req.params;
        const { title, yearPublished, category, author} = req.body;
        const update = await bookModel.findByIdAndUpdate(id, {
            title,
            yearPublished,
            category,
            author,
        },
        {new: true}
    );
    if(!update) {
        res.status(404).json({message: "Unable to update "});
    }
    } catch (error) {
        res.status(400).json({message: "Unable to update", error});
    }
});
app.delete("/:id", async (req, res) => {
    try {
        let {id} = req.params;
        const deleteBook = await bookModel.findByIdAndDelete(id);
        if (!deleteBook) {
            res.status(404).json({message: "This book does not exist"});
        }
        res.status(200).json({message: "Book successfully deleted"});
    } catch (error) {
        res.status(404).json({message: "An error occurred", error});
    }
});

const date = new Date();

app.listen(port, () => {
    console.log(date.toDateString, port)
})
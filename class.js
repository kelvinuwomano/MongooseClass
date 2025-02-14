const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = process.env.port;

app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/bookDb")
.then(() => {
    console.log("Connected")
})
.catch((error) => {
    console.log("An error occured", error)
});

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre: String,
    available: Boolean,
});

const bookModel = mongoose.model("book", BookSchema);

app.get("/books", async (req, res) => {
    try {
        const getAllBooks = await bookModel.find();
        res.status(200).json({status: true, getAllBooks})
    } catch (error) {
        res.status(404).json({status: false, error: error.message})
    }
});

app.get("/get-one-book/:id", async (req,res) => {
    try {
        const getOneBook = await bookModel.findById(req.params.id);
        if (!getOneBook) {
            res.status(404).json({status: false, message:"Book not found"});
        }
        res.status(200).json({status: true, getOneBook});
    } catch (error) {
        res.status(500).json({status: false, error: error.message});

    }
});

app.post("/create-book", async (req,res) => {
    try {
        const {title, author, publishedYear, genre, available} = req.body;
        
        const createBook = await bookModel.create({ title, author, publishedYear, genre, available});
        res.status(200).json({message: "Book successfully created", book: createBook})
    } catch (error) {
        res.status(500).json({message: "Unable to create book", error: error.message})
    }
});

app.patch("/update-book/:id", async (req, res) => {
    try {
        const {title, author, publishedYear, genre, available} = req.body;

        const updateBook = await bookModel.findByIdAndUpdate(
        req.params.id, 
        {
            title,
            author,
            publishedYear,
            genre,
            available,
        },
        {new : true}
    );
        res.status(200).json({status: true, updateBook});
    } catch (error) {
        res.status(500).json({status: false, error: error.message});
    }
});
app.patch("/update-book/:id/toogle-availability", async (req, res) => {
    try {
        const {available} = req.body;

        const updateBook = await bookModel.findByIdAndUpdate(
        req.params.id, 
        {
            available,
        },
        {new : true}
    );
        res.status(200).json({status: true, updateBook});
    } catch (error) {
        res.status(500).json({status: false, error: error.message});
    }
});

app.delete("/delete-book/:id", async (req, res) => {
    try {
        const deleteBook = await bookModel.findByIdAndDelete(req.params.id);
        if (!deleteBook) {
            res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({status: true, message: "Book deleted successfully"});
    } catch (error) {
        res.status(500).json({status: true, error: error.message});
    }
});

app.all("/delete-all-books", async (req, res) => {
  try {
    await bookModel.deleteMany();
    res.status(200).json({status: true, message: "All books deleted"});
} catch (error) {
      res.status(404).json({status: false, message: "An error occured"});
  }
});

app.listen(port, () => {
    console.log("App is listening to port", port)
});
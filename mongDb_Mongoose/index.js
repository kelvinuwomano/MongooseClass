const express = require("express");
const mongoose = require("mongoose");

const port = 2932;
const app = express();
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
  author: String,
  category: String,
});

const bookModel = mongoose.model("book", BookSchema);

app.get("/", async (req, res) => {
  //   const getBooks = bookModel
  //     .find()
  //     .then((data) => {
  //       res.status(200).json({ message: "all books", books: data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  try {
    const getBooks = await bookModel.find();
    res.status(200).json({ message: "all books", books: getBooks });
  } catch (err) {
    res.status(500).json({ message: "an error occured", err });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, author, category, yearPublished } = req.body;

    const postBook = await bookModel.create({
      title,
      author,
      category,
      yearPublished,
    });

    res.status(201).json({ message: "Book Posted", data: postBook });
  } catch (error) {
    res.status(500).json({ message: "an error occured", err });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getOneBook = await bookModel.findById(id);

    if (!getOneBook) {
      res.status(404).json({ message: "This book does not exist" });
    }

    res.status(200).json({ message: "Book Gotten", data: getOneBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "an error occured", err });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, yearPublished } = req.body;

    const updateBook = await bookModel.findByIdAndUpdate(
      id,
      {
        title,
        author,
        category,
        yearPublished,
      },
      { new: true }
    );

    if (!updateBook) {
      res.status(404).json({ message: "This book does not exist" });
    }

    res.status(200).json({ message: "Book Gotten", data: updateBook });
  } catch (err) {
    res.status(500).json({ message: "an error occured", err });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteBook = await bookModel.findByIdAndDelete(id);

    if (!deleteBook) {
      res.status(404).json({ message: "This book does not exist" });
    }

    res.status(200).json({ message: "Book Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "an error occured", err });
  }
});

const date = new Date();

app.listen(port, () => {
  console.log(date.toDateString(), port);
});
var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

/* GET home page. */
router.get("/", async function (req, res, next) {
  const books = await Book.findAll();
  res.render("books", { books });
  //   console.log(res.json(books));
});

/* Create a new book form. */
router.get("/new", (req, res) => {
  res.render("books/new", { book: {}, title: "New Book" });
});

/* Post a new book */
router.post("/new", async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // checking the error
      book = await Book.build(req.body);
      res.render("books/new", {
        book,
        errors: error.errors,
        title: "New Book",
      });
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
});

// Get a particular book
router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render("books/update", { book: book, title: book.title });
  } else {
    res.sendStatus(404);
  }
});

/* Update a Book. */
router.post("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct book gets updated
      res.render("books/update", {
        book,
        errors: error.errors,
        title: "Update Book",
      });
    } else {
      throw error;
    }
  }
});

// Deletes a book

router.post("/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

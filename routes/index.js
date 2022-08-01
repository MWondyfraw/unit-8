var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/books");
});

// Shows the full list of books

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll();
//     res.render("index", { books });
//   })
// );

// Shows the create new book form

// router.get(
//   "/books/new",
//   asyncHandler(async (req, res) => {
//     const books = await Book.findAll();
//     res.render("new-book", { book: {}, title: "New Book" });
//   })
// );

// Posts a new book to the database

// router.post(
//   "/books/new",
//   asyncHandler(async (req, res) => {
//     let books;
//     try {
//       book = await Book.create(req.body);
//       res.redirect("/books");
//     } catch (error) {
//       if (error.name === "SequelizeValidationError") {
//         book = await Book.build(req.body);
//         res.render("new-book", {
//           book,
//           errors: error.errors,
//           title: "New Book",
//         });
//       } else {
//         throw error;
//       }
//     }
//   })
// );

// Shows book detail form

// router.get(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (books) {
//       res.render("update-book", { books, title: "Update Book" });
//     } else {
//       res.sendStatus(404);
//     }
//   })
// );

// Updates book info in the database

// router.post(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     let books;
//     try {
//       book = await Book.findByPk(req.params.id);
//       if (book) {
//         await books.update(req.body);
//         res.redirect("/books");
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (error) {
//       if (error.name === "SequelizeValidationError") {
//         book = await Book.build(req.body);
//         books.id = req.params.id;
//         res.render("update-book", {
//           books,
//           error: error.errors,
//           title: "Update Book",
//         });
//       } else {
//         throw error;
//       }
//     }
//   })
// );

// Deletes a book

// router.post(
//   "/books/:id/delete",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) {
//       await book.destroy();
//       res.redirect("/");
//     } else {
//       res.sendStatus(404);
//     }
//   })
// );

module.exports = router;

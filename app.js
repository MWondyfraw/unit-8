var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var booksRouter = require("./routes/books");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/users", usersRouter);

// Test connection to the database & sync the model
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful");
  } catch (error) {
    console.error("Error connecting to the database");
  }
  try {
    await sequelize.sync();
    console.log("Synched with database");
  } catch (error) {
    console.error("Snyched error with database");
  }
})();

//Set up MiddleWare
// 404 Error Handler

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `The requested webpage doesn't exist`;
  console.log(err);
  next(err);
});

// Global Error Handler

app.use((err, req, res, next) => {
  const error = new Error();
  error.status = err.status || 500;
  error.message =
    err.message || "Sorry! There was an unexpected error on the server.";
  // render the error page
  res.status(err.status || 500);
  res.render("error", { error });
});

module.exports = app;

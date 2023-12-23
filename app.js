const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // Use xmlparser middleware to parse XML bodies
// app.use(xmlparser());

// Configure body-parser to accept raw XML
app.use(bodyParser.raw({ type: "application/xml" }));

app.use(cookieParser());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 8000;

app.use(express.json()); // for parsing application/json

app.listen(PORT, () => {
  console.log(`Webhook server listening at http://localhost:${PORT}`);
});

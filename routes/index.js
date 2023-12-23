var express = require("express");
var router = express.Router();
const multer = require("multer");

// Set up multer for file handling
const upload = multer({ dest: "uploads/" }); // This will store files in an 'uploads' folder

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: "Welcome to the API",
  });
});

router.post("/webhook", upload.any(), (req, res) => {
  console.log("Received data:", req.body);
  console.log("Received files:", req.files);

  // const xmlData = req.body.toString(); // Convert the buffer to a string
  // console.log("Received XML data:", xmlData);
  res.status(200).json({
    status: "success",
    message: "Webhook received",
  });
});

router.get("/webhook/status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Webhook active",
  });
});

module.exports = router;

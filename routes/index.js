var express = require("express");
const xml2js = require('xml2js');
var router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


// Set up multer for file handling
//const upload = multer({ dest: "uploads/" }); // This will store files in an 'uploads' folder

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: "Welcome to the API",
  });
});

router.post("/webhook", upload.any(), (req, res) => {
  //console.log("Received data:", req.body);
  //console.log("Received files:", req.files);
  const xmlFile = req.files[0];
  try{
    if(xmlFile){
      const xmlData = xmlFile.buffer.toString('utf-8');
      //console.log("Received XML data:", xmlData);
    
      xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }
        const licensePlateValue = result.EventNotificationAlert.ANPR.licensePlate;
        console.log('License Plate:', licensePlateValue);
      });
    }
    else{
      console.log("no data received");
    }
  
    // const xmlData = req.body.toString(); // Convert the buffer to a string
    // console.log("Received XML data:", xmlData);
    res.status(200).json({
      status: "success",
      message: "Webhook received",
    });
  }
  catch (err){
    console.log(err);
  }
  
});

router.get("/webhook/status", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Webhook active",
  });
});

module.exports = router;

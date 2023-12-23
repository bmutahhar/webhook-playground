const multer = require("multer");
const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = ["application/xml", "text/xml"];

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      // Accept the file
      cb(null, true);
    } else {
      // Reject the file
      cb(null, false);
    }
  },
  //   using any here because this will receive an array of files whatever the fieldname is
  // Otherwise we have to tell multer the fieldname or every single file it shall receive or else it will throw an error.
}).any();

// In our case the other usage of multer (if needed) would be:
/* const upload = multer({
    ...params
}).fields([
    {
        name: "anpr.xml",
        maxCount: 1,
    },
    {
        name: "licensedPlatePicture.jpg",
        maxCount: 1,
    },
    
]);    
*/

const validateMulterUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer error: ", err);
      return res.status(500).send(err + "Upload failed due to multer error");
    } else if (err) {
      console.log("Unknown error: ", err);
      return res.status(500).send(err + "Upload failed due to unknown error");
    }
    // Everything went fine.
    next();
  });
};

module.exports = {
  validateMulterUpload,
};

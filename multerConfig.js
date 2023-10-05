const multer = require('multer');

// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/'); // The directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      const uniqueFilename = Date.now() + '-' + file.originalname;
      cb(null,uniqueFilename); // Generate a unique filename
    },
  });
  
const upload = multer({ storage });
module.exports=upload
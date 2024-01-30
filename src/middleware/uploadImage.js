const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Define the destination folder for image uploads
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    // Define the filename for uploaded images (you can modify this as needed)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// Create a multer instance with the storage options
const uploadImage = multer({ storage: storage });

module.exports = {
  uploadImage,
};

const path = require("path");
const fs = require("fs");

const deleteImage = (image) => {
  //! : DELETE IMAGE FROM UPLOAD FOLDER

  const uploadPath = path.join(__dirname, "../../uploads");
  const imagePath = `${uploadPath}/${image}`;

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

module.exports = deleteImage;

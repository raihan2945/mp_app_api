const { LetterBox } = require("@/src/model");

const getAll = async (req, res, next) => {
  try {
    const letter = await LetterBox.findAll();
    return res.status(200).json(letter);
  } catch (error) {
    console.log(error)
    return res.status(400).json({status: error.message});
  }
};

module.exports = getAll;

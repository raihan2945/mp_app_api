const { LetterBox } = require("@/src/model");

const createNew = async (req, res, next) => {
  const data = req.body;
  try {
    const letter = await LetterBox.create({ ...data });
    return res.status(200).json(letter);
  } catch (error) {
    console.log(error)
    return res.status(400).json({status: error.message});
  }
};

module.exports = createNew;

const { LetterBox } = require("@/src/model");

const deleteOne = async (req, res, next) => {
  try {
    const letter = await LetterBox.destroy(
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res.status(200).json(letter);
  } catch (error) {
    return res.status(400).json({ status: error.message });
  }
};

module.exports = deleteOne;

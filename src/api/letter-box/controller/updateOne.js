const { LetterBox } = require("@/src/model");

const updateOne = async (req, res, next) => {
  const data = req.body;
  try {
    const letter = await LetterBox.update(
      { ...data },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res.status(200).json(letter);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: error.message });
  }
};

module.exports = updateOne;

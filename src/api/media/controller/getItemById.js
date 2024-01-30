const folderService = require("@/src/lib/folder");
const inputSchema = require("@/src/validators/inputValidation");

const getItemById = async (req, res, next) => {
  const id = req.params.id;

  const validationProperties = [{ name: "id", type: "number", required: true }];

  //* BUILD INPUT SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate({ id }, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((details) => {
        return details.message;
      }),
    });
  }

  try {
    //*: CALL AUTH SERVICE TO SEND OTP TO USERS
    const Item = await folderService.findItemById(id);

    const response = {
      code: 200,
      message: "Item get successfully",
      data: {
        ...Item,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = getItemById;

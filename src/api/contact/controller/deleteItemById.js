const contactService = require("@/src/lib/contact");
const inputSchema = require("@/src/validators/inputValidation");

const deleteItemById = async (req, res, next) => {
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
    const Item = await contactService.deleteItemById(id);

    const response = {
      code: 200,
      message: "Item deleted successfully",
      data: {
        ...Item,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItemById;

const mediaService = require("@/src/lib/media");
const inputSchema = require("@/src/validators/inputValidation");

const createNewItem = async (req, res, next) => {
  const bodyData = req.body;
  const { name, folder_id } = bodyData;

  const validationProperties = [
    { name: "folder_id", type: "string", required: false },
    { name: "name", type: "string", required: true },
  ];

  //* BUILD INPU T SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate(
    { name, folder_id },
    { abortEarly: false }
  );

  if (error) {
    return res.status(400).json({
      error: error.details.map((details) => {
        return details.message;
      }),
    });
  }

  try {
    //*:
    const createData = await mediaService.createNew(bodyData);

    const response = {
      code: 200,
      message: "Item created successfully",
      data: {
        ...createData,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createNewItem;

const folderService = require("@/src/lib/folder");
const inputSchema = require("@/src/validators/inputValidation");

const createNewItem = async (req, res, next) => {
  const bodyData = req.body;

  const validationProperties = [
    { name: "name", type: "string", required: true },
    { name: "folder_id", type: "string", required: false },
  ];

  //* BUILD INPU T SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate(
    { ...bodyData },
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
    const createData = await folderService.createNew(bodyData);

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

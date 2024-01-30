const contactService = require("@/src/lib/contact");
const inputSchema = require("@/src/validators/inputValidation");

const createNewItem = async (req, res, next) => {
  const bodyData = req.body;

  const validationProperties = [
    { name: "category_id", type: "number", required: false },
    { name: "first_name", type: "string", required: true },
    { name: "last_name", type: "string", required: false },
    { name: "company", type: "string", required: false },
    { name: "phone", type: "number", required: false },
    { name: "mobile", type: "mobile", required: false },
    { name: "email", type: "email", required: false },
    { name: "dob", type: "string", required: false },
    { name: "address", type: "string", required: false },
    { name: "notes", type: "string", required: false },
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
    const createData = await contactService.createNew(bodyData);

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

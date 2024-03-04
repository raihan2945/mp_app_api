const contactService = require("@/src/lib/contact");
const inputSchema = require("@/src/validators/inputValidation");

const getAllItems = async (req, res, next) => {
    const queries = req.query;
    const search = req.query.search

  const validationProperties = [
    { name: "division", type: "string", required: false },
    { name: "district", type: "string", required: false },
    { name: "upazila", type: "string", required: false },
    { name: "union", type: "string", required: false },
    { name: "tag", type: "string", required: false },
    { name: "category_id", type: "string", required: false },
    { name: "first_name", type: "string", required: false },
    { name: "last_name", type: "string", required: false },
    { name: "mobile", type: "string", required: false },
    { name: "email", type: "string", required: false },
    { name: "address", type: "string", required: false },
    { name: "search", type: "string", required: false },
  ];

  //* BUILD INPUT SCHEMA
  const buildedSchema = inputSchema(validationProperties);

  //* : VALIDATE INPUT DATA
  const { error } = buildedSchema.validate({...queries}, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((details) => {
        return details.message;
      }),
    });
  }

  try {
    //*: CALL AUTH SERVICE TO SEND OTP TO USERS
    const items = await contactService.findAllItems({queries, search});

    const response = {
      code: 200,
      message: "Items get Successfully",
      data: [...items],
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllItems;

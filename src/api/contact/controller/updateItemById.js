const contactService = require("@/src/lib/contact");
const inputSchema = require("@/src/validators/inputValidation");

const updateItemById = async (req, res, next) => {
  const id = req.params.id;
  const bodyData = req.body;

  // const validationProperties = [
  //   { name: "id", type: "number", required: true },
  //   { name: "category_id", type: "number", required: false },
  //   { name: "first_name", type: "string", required: false },
  //   { name: "last_name", type: "string", required: false },
  //   { name: "company", type: "string", required: false },
  //   { name: "phone", type: "number", required: false },
  //   { name: "mobile", type: "mobile", required: false },
  //   { name: "email", type: "email", required: false },
  //   { name: "dob", type: "string", required: false },
  //   { name: "address", type: "string", required: false },
  //   { name: "address_2", type: "string", required: false },
  //   { name: "notes", type: "string", required: false },
  //   { name: "status", type: "string", required: false },
  //   { name: "division", type: "string", required: false },
  //   { name: "district", type: "string", required: false },
  //   { name: "upazila", type: "string", required: false },
  //   { name: "union", type: "string", required: false },
  //   { name: "tag", type: "string", required: false },
  //   { name: "office", type: "string", required: false },
  // ];

  //* BUILD INPUT SCHEMA
  // const buildedSchema = inputSchema(validationProperties);

  // //* : VALIDATE INPUT DATA
  // const { error } = buildedSchema.validate(
  //   { id, ...bodyData },
  //   { abortEarly: false }
  // );

  // if (error) {
  //   return res.status(400).json({
  //     error: error.details.map((details) => {
  //       return details.message;
  //     }),
  //   });
  // }

  try {
    //*:
    const item = await contactService.updateItemById(id, bodyData);

    const response = {
      code: 200,
      message: "Item Updated Successfully",
      data: {
        ...item,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItemById;

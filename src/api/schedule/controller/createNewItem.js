const scheduleSerivce = require("@/src/lib/schedule");
const inputSchema = require("@/src/validators/inputValidation");

const createNewItem = async (req, res, next) => {
  const bodyData = req.body;

  const validationProperties = [
    { name: "name", type: "string", required: true },
    { name: "details", type: "string", required: false },
    { name: "date", type: "string", required: false },
    { name: "time", type: "string", required: false },
    { name: "remind_time", type: "string", required: false },
    { name: "schedule_type", type: "string", required: false },
    { name: "notes", type: "string", required: false },
  ];

  //* BUILD INPUT SCHEMA
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
    const createData = await scheduleSerivce.createNew(bodyData);

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

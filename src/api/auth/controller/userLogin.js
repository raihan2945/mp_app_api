const authService = require("@/src/lib/auth");
const inputSchema = require("@/src/validators/inputValidation");

const userLogin = async (req, res, next) => {
  const bodyData = req.body;

  const validationProperties = [
    { name: "mobile", type: "number", required: true },
    { name: "password", type: "password", required: true },
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
    //*: CALL AUTH SERVICE TO SEND OTP TO USERS
    const user = await authService.loginUser({ ...bodyData });

    const response = {
      code: 200,
      message: "User looged in successfully",
      data: {
        ...user,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = userLogin;

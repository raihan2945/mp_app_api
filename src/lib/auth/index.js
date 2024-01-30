const { Users } = require("@/src/model");
const { notFound, badRequest } = require("@/src/utils/error");
const tokenService = require("@/src/lib/token")

//*: Login user by email & password
const loginUser = async ({ mobile, password }) => {
  const user = await Users.findOne({ where: { mobile: mobile }, raw: true });

  if (!user) {
    throw notFound("This mobile isn't found!");
  } else {
    if (user.password === password) {
      const payload = {
        id: user?.id,
        email: user?.email,
        role: "advisor",
      };

      return {
        ...user,
        access_token: tokenService.generateToken({ payload }),
      };
    } else {
      throw badRequest("Password didn't matched");
    }
  }
};

module.exports = {
  loginUser,
};

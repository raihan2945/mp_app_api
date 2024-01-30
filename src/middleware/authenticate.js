const tokenService = require("@/src/lib/token");
const userService = require("@/src/lib/user");
const adminService = require("@/src/lib/admin");
const { authenticationError, badRequest } = require("../utils/error");

const authenticate = async (req, res, next) => {
  const auth = await req.headers.authorization;

  if (!auth) {
    next(authenticationError());
  }

  const token = auth && req.headers.authorization.split(" ")[1];

  try {
    const decoded = tokenService.verifyToken({ token });

    // console.log("Decode is : ", decoded);

    let user;

    if (
      decoded?.role == "admin" ||
      decoded?.role == "visitor" ||
      decoded?.role == "controller"
    ) {
      user = await adminService.findAdminsByEmail(decoded.email);
    }
    if (decoded?.role == "mio") {
      user = await userService.findUserByWorkArea(decoded.work_area);
    }

    // console.log("User is : ", user);

    if (!user) {
      next(authenticationError());
    }

    if (decoded?.role == "admin" || "visitor" || "controller") {
    } else {
      if (user.active !== 1) {
        next(authenticationError(`Your account is decatived`));
      }
    }

    // if (user.role !== "customer") {
    delete user.password;
    // }

    if (decoded?.role == "admin" || "visitor" || "controller") {
      req.query.email = user.email;
    }
    if (decoded?.role == "mio") {
      req.query.id = user.work_area_t;
    }

    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;

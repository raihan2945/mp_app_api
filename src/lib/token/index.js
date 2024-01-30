const { serverError } = require("../../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = ({
  payload,
  algorithm = "HS256",
  // secret = "raihan@123",
  secret = process.env.ACCESS_TOKEN_SECRET,
  expiresIn = "30d",
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      expiresIn,
    });
  } catch (err) {
    console.log("[JWT] Error : ", err);
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm: [algorithm] });
  } catch (e) {
    console.log("[JWT] Error : ", err);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.decode(token, secret, { algorithm: [algorithm] });
  } catch (e) {
    console.log("[JWT] Error : ", err);
    throw serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};

const { Unauthorized } = require("../errors");
const debug = require("debug")("app:cookiesMiddleWare");

const cookiesOption = {
  httpOnly: false,
  secure: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  sameSite: "none",
};

const generateTokenAndSetCookie = async (req, res, next) => {
  if (!req.user) {
    throw new Unauthorized(`User authentication required.`);
  }
  const token = req.user.createToken();
  res.cookie("authToken", token, cookiesOption);
  const { _id: userId, username, role } = req.user;
  req.userData = { userId, username, token };
  const statusCode = req.statusCode || 200;
  return res.status(statusCode).json({ userId, username, token, role });
};

module.exports = { generateTokenAndSetCookie };

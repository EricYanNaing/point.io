const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decryptedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

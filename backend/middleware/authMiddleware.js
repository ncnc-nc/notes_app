const jwt = require("jsonwebtoken");

const SECRET_KEY = "notes_app_secret";

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

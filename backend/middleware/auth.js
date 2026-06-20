const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;

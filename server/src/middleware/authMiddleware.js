const jwt = require("jsonwebtoken");
const db = require("../models");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await db.Role.findByPk(user.role_id);
    if (role.name !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

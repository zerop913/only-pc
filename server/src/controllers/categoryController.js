const db = require("../models/index");
const Category = db.Category;

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    return res.json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const db = require("../models/index");

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await db.Subcategory.findAll({
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });
    return res.json(subcategories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSubcategoryById = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    const subcategory = await db.Subcategory.findOne({
      where: { subcategory_id: subcategoryId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    return res.json(subcategory);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

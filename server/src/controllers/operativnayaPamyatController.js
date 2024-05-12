const db = require("../models/index");

exports.getAllOperativnayaPamyat = async (req, res) => {
  try {
    const operativnayaPamyat = await db.OperativnayaPamyat.findAll({
      raw: true,
    });
    return res.json(operativnayaPamyat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOperativnayaPamyatById = async (req, res) => {
  const operativnayaPamyatId = req.params.operativnayaPamyatId;

  try {
    const operativnayaPamyat = await db.OperativnayaPamyat.findOne({
      where: { id: operativnayaPamyatId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!operativnayaPamyat) {
      return res.status(404).json({ error: "OperativnayaPamyat not found" });
    }

    return res.json(operativnayaPamyat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

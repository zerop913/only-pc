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

exports.createOperativnayaPamyat = async (req, res) => {
  try {
    const newOperativnayaPamyat = await db.OperativnayaPamyat.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newOperativnayaPamyat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOperativnayaPamyat = async (req, res) => {
  const operativnayaPamyatId = req.params.operativnayaPamyatId;

  try {
    const operativnayaPamyat = await db.OperativnayaPamyat.findByPk(
      operativnayaPamyatId
    );

    if (!operativnayaPamyat) {
      return res.status(404).json({ error: "OperativnayaPamyat not found" });
    }

    await operativnayaPamyat.update(req.body);
    return res.json({ message: "OperativnayaPamyat updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOperativnayaPamyat = async (req, res) => {
  const operativnayaPamyatId = req.params.operativnayaPamyatId;

  try {
    const operativnayaPamyat = await db.OperativnayaPamyat.findOne({
      where: { id: operativnayaPamyatId },
    });

    if (!operativnayaPamyat) {
      return res.status(404).json({ error: "OperativnayaPamyat not found" });
    }

    await operativnayaPamyat.destroy();
    return res.json({ message: "OperativnayaPamyat deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

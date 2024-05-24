const db = require("../models/index");

exports.getAllMotherboards = async (req, res) => {
  try {
    const motherboards = await db.Motherboard.findAll({ raw: true });
    return res.json(motherboards);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMotherboardById = async (req, res) => {
  const motherboardId = req.params.motherboardId;

  try {
    const motherboard = await db.Motherboard.findOne({
      where: { id: motherboardId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!motherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }

    return res.json(motherboard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createMotherboard = async (req, res) => {
  try {
    const newMotherboard = await db.Motherboard.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newMotherboard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateMotherboard = async (req, res) => {
  const motherboardId = req.params.motherboardId;

  try {
    const motherboard = await db.Motherboard.findByPk(motherboardId);

    if (!motherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }

    await motherboard.update(req.body);
    return res.json({ message: "Motherboard updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteMotherboard = async (req, res) => {
  const motherboardId = req.params.motherboardId;

  try {
    const motherboard = await db.Motherboard.findOne({
      where: { id: motherboardId },
    });

    if (!motherboard) {
      return res.status(404).json({ error: "Motherboard not found" });
    }

    await motherboard.destroy();
    return res.json({ message: "Motherboard deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const db = require("../models/index");

exports.getAllBlokiPitaniya = async (req, res) => {
  try {
    const blokiPitaniya = await db.BlokiPitaniya.findAll({ raw: true });
    return res.json(blokiPitaniya);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlokiPitaniyaById = async (req, res) => {
  const blokiPitaniyaId = req.params.blokiPitaniyaId;

  try {
    const blokiPitaniya = await db.BlokiPitaniya.findOne({
      where: { id: blokiPitaniyaId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!blokiPitaniya) {
      return res.status(404).json({ error: "BlokiPitaniya not found" });
    }

    return res.json(blokiPitaniya);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createBlokiPitaniya = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const newBlokiPitaniya = await db.BlokiPitaniya.create(req.body, {
      fields: Object.keys(req.body),
    });

    console.log("Created BlokiPitaniya:", newBlokiPitaniya);

    return res.json(newBlokiPitaniya);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlokiPitaniya = async (req, res) => {
  const blokiPitaniyaId = req.params.blokiPitaniyaId;

  try {
    const blokiPitaniya = await db.BlokiPitaniya.findOne({
      where: { id: blokiPitaniyaId },
    });

    if (!blokiPitaniya) {
      return res.status(404).json({ error: "BlokiPitaniya not found" });
    }

    await blokiPitaniya.destroy();
    return res.json({ message: "BlokiPitaniya deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBlokiPitaniya = async (req, res) => {
  const blokiPitaniyaId = req.params.blokiPitaniyaId;

  try {
    const blokiPitaniya = await db.BlokiPitaniya.findByPk(blokiPitaniyaId);

    if (!blokiPitaniya) {
      return res.status(404).json({ error: "BlokiPitaniya not found" });
    }

    await blokiPitaniya.update(req.body);
    return res.json({ message: "BlokiPitaniya updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

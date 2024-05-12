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

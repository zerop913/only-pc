const db = require("../models/index");

exports.getAllKulery = async (req, res) => {
  try {
    const kulery = await db.KuleryDlyaProcessorov.findAll({ raw: true });
    return res.json(kulery);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getKuleryById = async (req, res) => {
  const kuleryId = req.params.kuleryId;

  try {
    const kulery = await db.KuleryDlyaProcessorov.findOne({
      where: { id: kuleryId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!kulery) {
      return res.status(404).json({ error: "Kulery not found" });
    }

    return res.json(kulery);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

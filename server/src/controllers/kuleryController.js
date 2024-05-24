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

exports.createKulery = async (req, res) => {
  try {
    const newKulery = await db.KuleryDlyaProcessorov.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newKulery);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateKulery = async (req, res) => {
  const kuleryId = req.params.kuleryId;

  try {
    const kulery = await db.KuleryDlyaProcessorov.findByPk(kuleryId);

    if (!kulery) {
      return res.status(404).json({ error: "Kulery not found" });
    }

    await kulery.update(req.body);
    return res.json({ message: "Kulery updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteKulery = async (req, res) => {
  const kuleryId = req.params.kuleryId;

  try {
    const kulery = await db.KuleryDlyaProcessorov.findOne({
      where: { id: kuleryId },
    });

    if (!kulery) {
      return res.status(404).json({ error: "Kulery not found" });
    }

    await kulery.destroy();
    return res.json({ message: "Kulery deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

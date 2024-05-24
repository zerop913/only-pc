const db = require("../models/index");

exports.getAllKorpusa = async (req, res) => {
  try {
    const korpusa = await db.Korpusa.findAll({ raw: true });
    return res.json(korpusa);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getKorpusaById = async (req, res) => {
  const korpusaId = req.params.korpusaId;

  try {
    const korpusa = await db.Korpusa.findOne({
      where: { id: korpusaId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!korpusa) {
      return res.status(404).json({ error: "Korpusa not found" });
    }

    return res.json(korpusa);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createKorpusa = async (req, res) => {
  try {
    const newKorpusa = await db.Korpusa.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newKorpusa);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateKorpusa = async (req, res) => {
  const korpusaId = req.params.korpusaId;

  try {
    const korpusa = await db.Korpusa.findByPk(korpusaId);

    if (!korpusa) {
      return res.status(404).json({ error: "Korpusa not found" });
    }

    await korpusa.update(req.body);
    return res.json({ message: "Korpusa updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteKorpusa = async (req, res) => {
  const korpusaId = req.params.korpusaId;

  try {
    const korpusa = await db.Korpusa.findOne({ where: { id: korpusaId } });

    if (!korpusa) {
      return res.status(404).json({ error: "Korpusa not found" });
    }

    await korpusa.destroy();
    return res.json({ message: "Korpusa deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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

const db = require("../models/index");

exports.getAllNakopiteliSsd = async (req, res) => {
  try {
    const nakopiteliSsd = await db.NakopiteliSsd.findAll({ raw: true });
    return res.json(nakopiteliSsd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNakopiteliSsdById = async (req, res) => {
  const nakopiteliSsdId = req.params.nakopiteliSsdId;

  try {
    const nakopiteliSsd = await db.NakopiteliSsd.findOne({
      where: { id: nakopiteliSsdId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!nakopiteliSsd) {
      return res.status(404).json({ error: "NakopiteliSsd not found" });
    }

    return res.json(nakopiteliSsd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createNakopiteliSsd = async (req, res) => {
  try {
    const newNakopiteliSsd = await db.NakopiteliSsd.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newNakopiteliSsd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateNakopiteliSsd = async (req, res) => {
  const nakopiteliSsdId = req.params.nakopiteliSsdId;

  try {
    const nakopiteliSsd = await db.NakopiteliSsd.findByPk(nakopiteliSsdId);

    if (!nakopiteliSsd) {
      return res.status(404).json({ error: "NakopiteliSsd not found" });
    }

    await nakopiteliSsd.update(req.body);
    return res.json({ message: "NakopiteliSsd updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteNakopiteliSsd = async (req, res) => {
  const nakopiteliSsdId = req.params.nakopiteliSsdId;

  try {
    const nakopiteliSsd = await db.NakopiteliSsd.findOne({
      where: { id: nakopiteliSsdId },
    });

    if (!nakopiteliSsd) {
      return res.status(404).json({ error: "NakopiteliSsd not found" });
    }

    await nakopiteliSsd.destroy();
    return res.json({ message: "NakopiteliSsd deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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

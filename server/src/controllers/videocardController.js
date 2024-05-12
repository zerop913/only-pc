const db = require("../models/index");
const categoryController = require("./categoryController");

exports.getAllVideocards = async (req, res) => {
  try {
    const videocards = await db.Videocard.findAll({ raw: true });
    return res.json(videocards);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVideocardByCategory = async (req, res) => {
  const videocardId = req.params.videocardId;

  try {
    const videocard = await db.Videocard.findOne({
      where: { id: videocardId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!videocard) {
      return res.status(404).json({ error: "Videocard not found" });
    }

    return res.json(videocard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

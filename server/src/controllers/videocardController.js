const db = require("../models/index");

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

exports.createVideocard = async (req, res) => {
  try {
    const newVideocard = await db.Videocard.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newVideocard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateVideocard = async (req, res) => {
  const videocardId = req.params.videocardId;

  try {
    const videocard = await db.Videocard.findByPk(videocardId);

    if (!videocard) {
      return res.status(404).json({ error: "Videocard not found" });
    }

    await videocard.update(req.body);
    return res.json({ message: "Videocard updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteVideocard = async (req, res) => {
  const videocardId = req.params.videocardId;

  try {
    const videocard = await db.Videocard.findOne({
      where: { id: videocardId },
    });

    if (!videocard) {
      return res.status(404).json({ error: "Videocard not found" });
    }

    await videocard.destroy();
    return res.json({ message: "Videocard deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

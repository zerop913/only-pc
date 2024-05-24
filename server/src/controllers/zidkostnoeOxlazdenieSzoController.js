const db = require("../models/index");

exports.getAllZidkostnoeOxlazdenieSzo = async (req, res) => {
  try {
    const zidkostnoeOxlazdenieSzo = await db.ZidkostnoeOxlazdenieSzo.findAll({
      raw: true,
    });
    return res.json(zidkostnoeOxlazdenieSzo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getZidkostnoeOxlazdenieSzoById = async (req, res) => {
  const zidkostnoeOxlazdenieSzoId = req.params.zidkostnoeOxlazdenieSzoId;

  try {
    const zidkostnoeOxlazdenieSzo = await db.ZidkostnoeOxlazdenieSzo.findOne({
      where: { id: zidkostnoeOxlazdenieSzoId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!zidkostnoeOxlazdenieSzo) {
      return res
        .status(404)
        .json({ error: "ZidkostnoeOxlazdenieSzo not found" });
    }

    return res.json(zidkostnoeOxlazdenieSzo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createZidkostnoeOxlazdenieSzo = async (req, res) => {
  try {
    const newZidkostnoeOxlazdenieSzo = await db.ZidkostnoeOxlazdenieSzo.create(
      req.body,
      {
        fields: Object.keys(req.body),
      }
    );
    return res.json(newZidkostnoeOxlazdenieSzo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateZidkostnoeOxlazdenieSzo = async (req, res) => {
  const zidkostnoeOxlazdenieSzoId = req.params.zidkostnoeOxlazdenieSzoId;

  try {
    const zidkostnoeOxlazdenieSzo = await db.ZidkostnoeOxlazdenieSzo.findByPk(
      zidkostnoeOxlazdenieSzoId
    );

    if (!zidkostnoeOxlazdenieSzo) {
      return res
        .status(404)
        .json({ error: "ZidkostnoeOxlazdenieSzo not found" });
    }

    await zidkostnoeOxlazdenieSzo.update(req.body);
    return res.json({
      message: "ZidkostnoeOxlazdenieSzo updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteZidkostnoeOxlazdenieSzo = async (req, res) => {
  const zidkostnoeOxlazdenieSzoId = req.params.zidkostnoeOxlazdenieSzoId;

  try {
    const zidkostnoeOxlazdenieSzo = await db.ZidkostnoeOxlazdenieSzo.findOne({
      where: { id: zidkostnoeOxlazdenieSzoId },
    });

    if (!zidkostnoeOxlazdenieSzo) {
      return res
        .status(404)
        .json({ error: "ZidkostnoeOxlazdenieSzo not found" });
    }

    await zidkostnoeOxlazdenieSzo.destroy();
    return res.json({
      message: "ZidkostnoeOxlazdenieSzo deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

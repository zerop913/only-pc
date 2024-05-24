const db = require("../models/index");

exports.getAllZhestkieDiskiHdd = async (req, res) => {
  try {
    const zhestkieDiskiHdd = await db.ZhestkieDiskiHdd.findAll({ raw: true });
    return res.json(zhestkieDiskiHdd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getZhestkieDiskiHddById = async (req, res) => {
  const zhestkieDiskiHddId = req.params.zhestkieDiskiHddId;

  try {
    const zhestkieDiskiHdd = await db.ZhestkieDiskiHdd.findOne({
      where: { id: zhestkieDiskiHddId },
      include: [
        {
          model: db.Category,
          required: true,
        },
      ],
    });

    if (!zhestkieDiskiHdd) {
      return res.status(404).json({ error: "ZhestkieDiskiHdd not found" });
    }

    return res.json(zhestkieDiskiHdd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createZhestkieDiskiHdd = async (req, res) => {
  try {
    const newZhestkieDiskiHdd = await db.ZhestkieDiskiHdd.create(req.body, {
      fields: Object.keys(req.body),
    });
    return res.json(newZhestkieDiskiHdd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateZhestkieDiskiHdd = async (req, res) => {
  const zhestkieDiskiHddId = req.params.zhestkieDiskiHddId;

  try {
    const zhestkieDiskiHdd = await db.ZhestkieDiskiHdd.findByPk(
      zhestkieDiskiHddId
    );

    if (!zhestkieDiskiHdd) {
      return res.status(404).json({ error: "ZhestkieDiskiHdd not found" });
    }

    await zhestkieDiskiHdd.update(req.body);
    return res.json({ message: "ZhestkieDiskiHdd updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteZhestkieDiskiHdd = async (req, res) => {
  const zhestkieDiskiHddId = req.params.zhestkieDiskiHddId;

  try {
    const zhestkieDiskiHdd = await db.ZhestkieDiskiHdd.findOne({
      where: { id: zhestkieDiskiHddId },
    });

    if (!zhestkieDiskiHdd) {
      return res.status(404).json({ error: "ZhestkieDiskiHdd not found" });
    }

    await zhestkieDiskiHdd.destroy();
    return res.json({ message: "ZhestkieDiskiHdd deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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

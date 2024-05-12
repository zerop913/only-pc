const db = require("../models/index");

exports.getAllProcessors = async (req, res) => {
  try {
    const processors = await db.Processor.findAll({ raw: true });
    return res.json(processors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProcessorById = async (req, res) => {
  const processorId = req.params.processorId;

  try {
    const processor = await db.Processor.findOne({
      where: { id: processorId },
    });

    if (!processor) {
      return res.status(404).json({ error: "Processor not found" });
    }

    return res.json(processor);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

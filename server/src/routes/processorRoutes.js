const express = require("express");
const router = express.Router();
const processorController = require("../controllers/processorController");

router.get("/", processorController.getAllProcessors);
router.get("/:processorId", processorController.getProcessorById);
router.post("/", processorController.createProcessor);
router.put("/:processorId", processorController.updateProcessor);
router.delete("/:processorId", processorController.deleteProcessor);

module.exports = router;

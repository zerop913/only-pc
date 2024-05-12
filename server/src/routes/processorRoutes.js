const express = require("express");
const router = express.Router();
const processorController = require("../controllers/processorController");

router.get("/", processorController.getAllProcessors);
router.get("/:processorId", processorController.getProcessorById);

module.exports = router;

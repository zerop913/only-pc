const express = require("express");
const router = express.Router();
const blokiPitaniyaController = require("../controllers/blokiPitaniyaController");

router.get("/", blokiPitaniyaController.getAllBlokiPitaniya);
router.get("/:blokiPitaniyaId", blokiPitaniyaController.getBlokiPitaniyaById);

module.exports = router;

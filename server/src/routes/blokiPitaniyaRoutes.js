const express = require("express");
const router = express.Router();
const blokiPitaniyaController = require("../controllers/blokiPitaniyaController");

router.get("/", blokiPitaniyaController.getAllBlokiPitaniya);
router.get("/:blokiPitaniyaId", blokiPitaniyaController.getBlokiPitaniyaById);
router.post("/", blokiPitaniyaController.createBlokiPitaniya);
router.delete("/:blokiPitaniyaId", blokiPitaniyaController.deleteBlokiPitaniya);
router.put("/:blokiPitaniyaId", blokiPitaniyaController.updateBlokiPitaniya);

module.exports = router;

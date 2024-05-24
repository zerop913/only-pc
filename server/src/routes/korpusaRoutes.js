const express = require("express");
const router = express.Router();
const korpusaController = require("../controllers/korpusaController");

router.get("/", korpusaController.getAllKorpusa);
router.get("/:korpusaId", korpusaController.getKorpusaById);
router.post("/", korpusaController.createKorpusa);
router.put("/:korpusaId", korpusaController.updateKorpusa);
router.delete("/:korpusaId", korpusaController.deleteKorpusa);

module.exports = router;

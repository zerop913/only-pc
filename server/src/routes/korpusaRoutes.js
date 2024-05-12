const express = require("express");
const router = express.Router();
const korpusaController = require("../controllers/korpusaController");

router.get("/", korpusaController.getAllKorpusa);
router.get("/:korpusaId", korpusaController.getKorpusaById);

module.exports = router;

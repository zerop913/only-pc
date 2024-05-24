const express = require("express");
const router = express.Router();
const kuleryController = require("../controllers/kuleryController");

router.get("/", kuleryController.getAllKulery);
router.get("/:kuleryId", kuleryController.getKuleryById);
router.post("/", kuleryController.createKulery);
router.put("/:kuleryId", kuleryController.updateKulery);
router.delete("/:kuleryId", kuleryController.deleteKulery);

module.exports = router;

const express = require("express");
const router = express.Router();
const kuleryController = require("../controllers/kuleryController");

router.get("/", kuleryController.getAllKulery);
router.get("/:kuleryId", kuleryController.getKuleryById);

module.exports = router;

const express = require("express");
const router = express.Router();
const zhestkieDiskiHddController = require("../controllers/zhestkieDiskiHddController");

router.get("/", zhestkieDiskiHddController.getAllZhestkieDiskiHdd);
router.get(
  "/:zhestkieDiskiHddId",
  zhestkieDiskiHddController.getZhestkieDiskiHddById
);

module.exports = router;

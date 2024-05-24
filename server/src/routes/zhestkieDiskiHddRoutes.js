const express = require("express");
const router = express.Router();
const zhestkieDiskiHddController = require("../controllers/zhestkieDiskiHddController");

router.get("/", zhestkieDiskiHddController.getAllZhestkieDiskiHdd);
router.get(
  "/:zhestkieDiskiHddId",
  zhestkieDiskiHddController.getZhestkieDiskiHddById
);
router.post("/", zhestkieDiskiHddController.createZhestkieDiskiHdd);
router.put(
  "/:zhestkieDiskiHddId",
  zhestkieDiskiHddController.updateZhestkieDiskiHdd
);
router.delete(
  "/:zhestkieDiskiHddId",
  zhestkieDiskiHddController.deleteZhestkieDiskiHdd
);

module.exports = router;

const express = require("express");
const router = express.Router();
const videocardController = require("../controllers/videocardController");

router.get("/", videocardController.getAllVideocards);
router.get("/:videocardId", videocardController.getVideocardByCategory);
router.post("/", videocardController.createVideocard);
router.put("/:videocardId", videocardController.updateVideocard);
router.delete("/:videocardId", videocardController.deleteVideocard);

module.exports = router;

const express = require("express");
const router = express.Router();
const videocardController = require("../controllers/videocardController");

router.get("/", videocardController.getAllVideocards);
router.get("/:videocardId", videocardController.getVideocardByCategory);

module.exports = router;

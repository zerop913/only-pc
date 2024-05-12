const express = require("express");
const router = express.Router();
const motherboardController = require("../controllers/motherboardController");

router.get("/", motherboardController.getAllMotherboards);
router.get("/:motherboardId", motherboardController.getMotherboardById);

module.exports = router;

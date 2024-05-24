const express = require("express");
const router = express.Router();
const motherboardController = require("../controllers/motherboardController");

router.get("/", motherboardController.getAllMotherboards);
router.get("/:motherboardId", motherboardController.getMotherboardById);
router.post("/", motherboardController.createMotherboard);
router.put("/:motherboardId", motherboardController.updateMotherboard);
router.delete("/:motherboardId", motherboardController.deleteMotherboard);

module.exports = router;

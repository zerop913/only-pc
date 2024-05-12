const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get("/", subcategoryController.getAllSubcategories);
router.get("/:subcategoryId", subcategoryController.getSubcategoryById);

module.exports = router;

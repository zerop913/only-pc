const express = require("express");
const router = express.Router();
const filtersController = require("../controllers/filtersController");

router.get("/:categoryName", filtersController.getFilters);

module.exports = router;

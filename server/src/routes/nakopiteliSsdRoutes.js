const express = require("express");
const router = express.Router();
const nakopiteliSsdController = require("../controllers/nakopiteliSsdController");

router.get("/", nakopiteliSsdController.getAllNakopiteliSsd);
router.get("/:nakopiteliSsdId", nakopiteliSsdController.getNakopiteliSsdById);

module.exports = router;

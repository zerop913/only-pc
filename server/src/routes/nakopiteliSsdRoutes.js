const express = require("express");
const router = express.Router();
const nakopiteliSsdController = require("../controllers/nakopiteliSsdController");

router.get("/", nakopiteliSsdController.getAllNakopiteliSsd);
router.get("/:nakopiteliSsdId", nakopiteliSsdController.getNakopiteliSsdById);
router.post("/", nakopiteliSsdController.createNakopiteliSsd);
router.put("/:nakopiteliSsdId", nakopiteliSsdController.updateNakopiteliSsd);
router.delete("/:nakopiteliSsdId", nakopiteliSsdController.deleteNakopiteliSsd);

module.exports = router;

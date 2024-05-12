const express = require("express");
const router = express.Router();
const zidkostnoeOxlazdenieSzoController = require("../controllers/zidkostnoeOxlazdenieSzoController");

router.get(
  "/",
  zidkostnoeOxlazdenieSzoController.getAllZidkostnoeOxlazdenieSzo
);
router.get(
  "/:zidkostnoeOxlazdenieSzoId",
  zidkostnoeOxlazdenieSzoController.getZidkostnoeOxlazdenieSzoById
);

module.exports = router;

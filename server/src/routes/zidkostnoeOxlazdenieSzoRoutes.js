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
router.post(
  "/",
  zidkostnoeOxlazdenieSzoController.createZidkostnoeOxlazdenieSzo
);
router.put(
  "/:zidkostnoeOxlazdenieSzoId",
  zidkostnoeOxlazdenieSzoController.updateZidkostnoeOxlazdenieSzo
);
router.delete(
  "/:zidkostnoeOxlazdenieSzoId",
  zidkostnoeOxlazdenieSzoController.deleteZidkostnoeOxlazdenieSzo
);

module.exports = router;

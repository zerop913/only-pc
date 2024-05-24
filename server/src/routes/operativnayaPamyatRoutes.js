const express = require("express");
const router = express.Router();
const operativnayaPamyatController = require("../controllers/operativnayaPamyatController");

router.get("/", operativnayaPamyatController.getAllOperativnayaPamyat);
router.get(
  "/:operativnayaPamyatId",
  operativnayaPamyatController.getOperativnayaPamyatById
);
router.post("/", operativnayaPamyatController.createOperativnayaPamyat);
router.put(
  "/:operativnayaPamyatId",
  operativnayaPamyatController.updateOperativnayaPamyat
);
router.delete(
  "/:operativnayaPamyatId",
  operativnayaPamyatController.deleteOperativnayaPamyat
);

module.exports = router;

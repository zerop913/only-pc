const express = require("express");
const router = express.Router();
const operativnayaPamyatController = require("../controllers/operativnayaPamyatController");

router.get("/", operativnayaPamyatController.getAllOperativnayaPamyat);
router.get(
  "/:operativnayaPamyatId",
  operativnayaPamyatController.getOperativnayaPamyatById
);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createShift,
  getAllShifts,
  updateShift,
  deleteShift,
} = require("../controllers/shift.controller");

const verificarToken = require("../middlewares/auth.middleware");

router.post("/", verificarToken, createShift);
router.get("/", getAllShifts);
router.put("/:id", verificarToken, updateShift);
router.delete("/:id", verificarToken, deleteShift);

module.exports = router;

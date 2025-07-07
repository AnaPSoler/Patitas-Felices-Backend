const express = require("express");
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getMyPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

const verifyToken = require("../middlewares/auth.middleware");

router.post("/", verifyToken, createPatient);
router.get("/", verifyToken, getAllPatients);
router.get("/mia", verifyToken, getMyPatients);
router.put("/:id", verifyToken, updatePatient); 
router.delete("/:id", verifyToken, deletePatient);

module.exports = router;

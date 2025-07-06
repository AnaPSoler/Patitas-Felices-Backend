const express = require("express");
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getMyPatients,
  deletePatient,
} = require("../controllers/patient.controller");
const verifyToken = require("../middlewares/auth.middleware");

// Ruta pública para obtener todos los pacientes (si se necesita)
router.get("/", verifyToken, getAllPatients);

// Ruta privada: obtener los pacientes del usuario autenticado
router.get("/mia", verifyToken, getMyPatients);

// Crear paciente (requiere token)
router.post("/", verifyToken, createPatient);

// Eliminar paciente (opcional)
router.delete("/:id", verifyToken, deletePatient);

module.exports = router;

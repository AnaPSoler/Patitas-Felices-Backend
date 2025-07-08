const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const shiftRoutes = require("./shift.routes");
const patientRoutes = require("./patient.routes");
const contactRoutes = require("./contact.routes");

router.use("/patients", patientRoutes);
router.use("/auth", authRoutes);
router.use("/shifts", shiftRoutes);
router.use("/pacientes", patientRoutes);
router.use("/contact", contactRoutes);


router.get("/", (req, res) => {
  res.send("🚀 API de Patitas Felices funcionando correctamente");
});

module.exports = router;

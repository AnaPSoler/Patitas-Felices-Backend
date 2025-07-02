const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const shiftRoutes = require("./shift.routes");


router.use("/auth", authRoutes);
router.use("/shifts", shiftRoutes);

router.get("/", (req, res) => {
  res.send("🚀 API de Patitas Felices funcionando correctamente");
});

module.exports = router;

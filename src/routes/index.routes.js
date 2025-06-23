const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");

router.use("/", authRoutes);

router.get("/", (req, res) => {
  res.send("🚀 API de Patitas Felices funcionando correctamente");
});

module.exports = router;

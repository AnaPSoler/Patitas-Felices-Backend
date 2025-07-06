const express = require("express");
const { createPreference } = require("../controllers/mercadopago.controller");

const router = express.Router();

router.post("/create_preference", createPreference);

module.exports = router;

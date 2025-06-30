const express = require("express");
const { enviarCorreo } = require("../controllers/email.controller");

const router = express.Router();

router.post("/send", enviarCorreo);

module.exports = router;

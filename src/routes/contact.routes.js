const express = require("express");
const router = express.Router();

const { guardarConsulta } = require("../controllers/contact.controller");

router.post("/", guardarConsulta);

module.exports = router;

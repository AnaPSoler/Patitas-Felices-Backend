const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 150 },
  mensaje: { type: String, required: true, maxlength: 250 },
  plan: { type: String },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);

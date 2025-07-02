const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  mascota: { type: String, required: true },
  nombreDuenio: { type: String, required: true },
  email: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  veterinario: { type: String, required: true },
  detalle: { type: String },
});

module.exports = mongoose.model("Shift", shiftSchema);

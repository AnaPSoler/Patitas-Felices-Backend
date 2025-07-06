const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  mascota: { type: String, required: true },
  veterinario: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  detalle: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Shift", shiftSchema);

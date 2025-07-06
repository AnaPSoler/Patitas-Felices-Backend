const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nombreDuenio: { type: String, required: true },
    apellidoDuenio: { type: String, required: true },
    emailDuenio: { type: String, required: true },
    telefonoDuenio: { type: String, required: true },
    nombreMascota: { type: String, required: true },
    especie: { type: String, required: true },
    raza: { type: String },
    sexo: { type: String, enum: ["Macho", "Hembra"], required: true },
    edad: { type: Number, required: true },
    peso: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);

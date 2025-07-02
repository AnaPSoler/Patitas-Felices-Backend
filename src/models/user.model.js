const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "usuario"], default: "usuario" },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    token: { type: String }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const Shift = require("../models/shift.model");

const createShift = async (req, res) => {
  try {
    const { mascota, veterinario, fecha, hora, detalle } = req.body;

    if (!mascota || !veterinario || !fecha || !hora) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const usuario = req.user;
    if (!usuario || !usuario.email || !usuario.nombre) {
      return res
        .status(403)
        .json({ msg: "Datos del usuario no disponibles en el token" });
    }

    const turnoExistente = await Shift.findOne({ fecha, hora, veterinario });
    if (turnoExistente) {
      return res.status(400).json({ msg: "Ese turno ya está ocupado" });
    }

    const nuevoTurno = new Shift({
      mascota: mascota.trim(),
      veterinario: veterinario.trim(),
      fecha: new Date(fecha),
      hora: hora.trim(),
      detalle: detalle?.trim() || "",
      nombreDuenio: usuario.nombre,
      email: usuario.email,
    });

    await nuevoTurno.save();


    res
      .status(201)
      .json({ msg: "Turno reservado exitosamente", turno: nuevoTurno });
  } catch (error) {
    console.error("❌ Error al crear turno:", error);
    res.status(500).json({ msg: "Error al crear turno" });
  }
};

const getAllShifts = async (req, res) => {
  try {
    const turnos = await Shift.find();
    res.status(200).json(turnos);
  } catch (error) {
    console.error("❌ Error al obtener turnos:", error);
    res.status(500).json({ msg: "Error al obtener turnos" });
  }
};

const updateShift = async (req, res) => {
  try {
    const actualizado = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Turno actualizado", turno: actualizado });
  } catch (error) {
    console.error("❌ Error al actualizar turno:", error);
    res.status(500).json({ msg: "Error al actualizar turno" });
  }
};

const deleteShift = async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Turno eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar turno:", error);
    res.status(500).json({ msg: "Error al eliminar turno" });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  updateShift,
  deleteShift,
};

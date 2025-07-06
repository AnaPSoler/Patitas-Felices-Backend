const Shift = require("../models/shift.model");

const createShift = async (req, res) => {
  try {
    const { mascota, veterinario, fecha, hora, detalle } = req.body;

    const nuevoTurno = new Shift({
      mascota,
      veterinario,
      fecha,
      hora,
      detalle,
      userId: req.user.id,
    });

    await nuevoTurno.save();
    res.status(201).json({ msg: "Turno creado con éxito", turno: nuevoTurno });
  } catch (error) {
    console.error("❌ Error al crear turno:", error);
    res.status(500).json({ msg: "Error al crear turno" });
  }
};

const getAllShifts = async (req, res) => {
  try {
    const turnos = await Shift.find().sort({ fecha: 1 });
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener turnos" });
  }
};

const getUserShifts = async (req, res) => {
  try {
    const userId = req.user.id;
    const turnos = await Shift.find({ userId }).sort({ fecha: 1 });
    res.json(turnos);
  } catch (error) {
    console.error("❌ Error al obtener turnos del usuario:", error);
    res.status(500).json({ msg: "Error al obtener turnos del usuario" });
  }
};

const updateShift = async (req, res) => {
  try {
    await Shift.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Turno actualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar turno" });
  }
};

const deleteShift = async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.id);
    res.json({ msg: "Turno eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar turno" });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  getUserShifts,
  updateShift,
  deleteShift,
};

const Patient = require("../models/patient.model");


const getMyPatients = async (req, res) => {
  try {
    const pacientes = await Patient.find({ userId: req.user.id });
    res.json(pacientes);
  } catch (error) {
    console.error("❌ Error al obtener mis mascotas:", error);
    res.status(500).json({ msg: "Error al obtener tus mascotas" });
  }
};

const createPatient = async (req, res) => {
  try {
    const paciente = new Patient({ ...req.body, userId: req.user.id });
    await paciente.save();
    res.status(201).json({ msg: "Mascota registrada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear paciente:", error);
    res.status(500).json({ msg: "Error al registrar mascota" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const pacientes = await Patient.find();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener pacientes" });
  }
};

const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar paciente" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({ msg: "Paciente no encontrado" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("❌ Error al actualizar paciente:", error);
    res.status(500).json({ msg: "Error al actualizar paciente" });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getMyPatients,
  deletePatient,
  updatePatient,
};


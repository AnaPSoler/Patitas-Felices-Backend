import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registrarUsuario = async ({ nombre, email, password }) => {
  const usuarioExistente = await User.findOne({ email });
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado.");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordEncriptada = await bcrypt.hash(password, salt);

  const nuevoUsuario = new User({
    nombre,
    email,
    password: passwordEncriptada,
  });

  return await nuevoUsuario.save();
};

export const loginUsuario = async ({ email, password }) => {
  const usuario = await User.findOne({ email });
  if (!usuario) {
    throw new Error("El usuario no existe.");
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    throw new Error("Contraseña incorrecta.");
  }

  return usuario;
};

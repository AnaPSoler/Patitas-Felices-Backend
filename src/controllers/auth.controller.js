const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHasheado = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({
      nombre,
      email,
      password: passwordHasheado,
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("❌ Error en el controlador de registro:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || "secreto",
      {
        expiresIn: "1h",
      }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

module.exports = {
  register,
  login,
};

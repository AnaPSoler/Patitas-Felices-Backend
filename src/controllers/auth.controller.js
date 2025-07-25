const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
        email: usuario.email,
        nombre: usuario.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      token,
      user: {
        rol: usuario.rol,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

module.exports = { register, login };

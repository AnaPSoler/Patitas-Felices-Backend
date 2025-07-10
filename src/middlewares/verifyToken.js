const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario.model");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ msg: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const usuario = await Usuario.findById(decoded.id).select(
      "nombre email rol"
    );
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    req.user = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

module.exports = verifyToken;

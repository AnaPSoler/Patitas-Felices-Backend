const Contact = require("../models/contact.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const guardarConsulta = async (req, res) => {
  try {
    const { nombre, email, consulta } = req.body;

    if (!nombre || !email || !consulta) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevaConsulta = new Contact({
      nombre,
      email,
      mensaje: consulta,
    });

    await nuevaConsulta.save();

    const mailOptions = {
      from: `"Consulta Web" <${process.env.EMAIL_USER}>`,
      to: "patitasfelices725@gmail.com",
      subject: "📬 Nueva consulta desde la web",
      html: `
        <h3>¡Nueva consulta recibida!</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${consulta}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ msg: "Consulta guardada y correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error en el controlador de contacto:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = { guardarConsulta };

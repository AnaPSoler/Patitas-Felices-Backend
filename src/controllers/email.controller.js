const nodemailer = require("nodemailer");

const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje, plan } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Consulta desde Patitas Felices" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nueva consulta sobre el plan: ${plan}`,
      html: `
        <h3>Consulta sobre el plan: ${plan}</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${
          mensaje || "Sin mensaje adicional."
        }</p>
      `,
    });

    await transporter.sendMail({
      from: `"Patitas Felices" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Gracias por tu consulta sobre el plan ${plan}`,
      html: `
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>¡Gracias por escribirnos! Recibimos tu consulta sobre el plan <strong>${plan}</strong> y en breve nos pondremos en contacto para brindarte más información.</p>
        <p>Saludos afectuosos,<br/>El equipo de <strong>Patitas Felices</strong></p>
      `,
    });

    res.status(200).json({ ok: true, msg: "Consulta enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ ok: false, msg: "Error al enviar el correo" });
  }
};

module.exports = { enviarCorreo };

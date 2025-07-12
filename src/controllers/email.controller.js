const nodemailer = require("nodemailer");

const enviarCorreo = async (req, res) => {
  const { nombre, email, mensaje, plan } = req.body;

  const frontendHomeUrl = "https://patitas-felices-ten.vercel.app"; 

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
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <img
            src="https://res.cloudinary.com/dylrki81z/image/upload/v1751171799/logo_ve1yry.png"
            alt="Logo Patitas Felices"
            style="max-width: 160px; margin-bottom: 15px; margin-top: 10px;"
          />
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>¡Gracias por escribirnos! Recibimos tu consulta sobre el plan <strong>${plan}</strong>.</p>
          <p>Próximamente uno de nuestros especialistas se pondrá en contacto para brindarte más información.</p>
          <p>Saludos afectuosos,<br/>El equipo de <strong>Patitas Felices</strong></p>
          <a
            href="${frontendHomeUrl}"
            style="
              display: inline-block;
              margin-top: 10px;
              padding: 12px 24px;
              background-color: #00bcd4;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              font-size: 16px;
            "
          >
            Ir al sitio
          </a>
        </div>
      `,
    });

    res.status(200).json({ ok: true, msg: "Consulta enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ ok: false, msg: "Error al enviar el correo" });
  }
};

module.exports = { enviarCorreo };

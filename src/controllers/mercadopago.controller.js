require("dotenv").config();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const createPreference = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "No se recibieron items válidos para crear la preferencia.",
      });
    }

    const itemsForMP = items.map((item) => {
      const unitPrice = Number(item.unit_price);
      const quantity = Number(item.quantity);

      if (isNaN(unitPrice) || unitPrice <= 0) {
        throw new Error(
          `El precio unitario debe ser un número válido y positivo. Error en item: ${
            item.title || item.nombre
          }`
        );
      }

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error(
          `La cantidad debe ser un número válido y positivo. Error en item: ${
            item.title || item.nombre
          }`
        );
      }

      return {
        id: item.id.toString(),
        title: item.nombre || item.title,
        description:
          item.descripcion || item.description || "Producto sin descripción",
        picture_url:
          item.imagen || item.picture_url || "https://example.com/default.jpg",
        unit_price: unitPrice,
        quantity: quantity,
        currency_id: "ARS",
      };
    });

    const frontURL = process.env.FRONTEND_URL || "http://localhost:5173";

    const preference = {
      items: itemsForMP,
      back_urls: {
        success: `${frontURL}/user/success`,
        failure: `${frontURL}/user/failure`,
        pending: `${frontURL}/user/pending`,
      },
      auto_return: "approved",
      external_reference: `patitas-felices-${Date.now()}`,
    };

    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Error desconocido al crear preferencia.",
    });
  }
};

module.exports = {
  createPreference,
};

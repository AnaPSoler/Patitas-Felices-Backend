import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import mercadopagoRoutes from "./routes/mercadopago.routes.js";

dotenv.config();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mercadopago", mercadopagoRoutes);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

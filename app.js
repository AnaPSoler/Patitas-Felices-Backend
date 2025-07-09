import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mercadopago from "mercadopago";
import mercadopagoRoutes from "./routes/mercadopago.routes.js";
import emailRoutes from "./routes/email.routes.js";

dotenv.config();

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://patitasfelices7.netlify.app",
  "https://patitasfelices-backend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(
            "CORS policy for this site does not allow access from the specified Origin."
          )
        );
      }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/mercadopago", mercadopagoRoutes);
app.use("/api", emailRoutes);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

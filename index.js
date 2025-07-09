require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const shiftRoutes = require("./src/routes/shift.routes");
const patientRoutes = require("./src/routes/patient.routes");
const contactRoutes = require("./src/routes/contact.routes");
const emailRoutes = require("./src/routes/email.routes");
const mercadopagoRoutes = require("./src/routes/mercadopago.routes");

require("./src/db/config.db");

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
        callback(new Error("CORS no permitido"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/pacientes", patientRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/mercadopago", mercadopagoRoutes);


app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("🚀 Servidor backend de Patitas Felices funcionando correctamente");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en el puerto ${port}`);
});

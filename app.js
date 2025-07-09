const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();

require("./src/db/config.db");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const authRoutes = require("./src/routes/auth.routes");
const shiftRoutes = require("./src/routes/shift.routes");
const patientRoutes = require("./src/routes/patient.routes");
const contactRoutes = require("./src/routes/contact.routes");
const mercadopagoRoutes = require("./src/routes/mercadopago.routes");
const emailRoutes = require("./src/routes/email.routes");

app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/pacientes", patientRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/mercadopago", mercadopagoRoutes);
app.use("/api/email", emailRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("🚀 API de Patitas Felices funcionando correctamente");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en el puerto ${port}`);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("./src/db/config.db");

const mercadopagoRoutes = require("./src/routes/mercadopago.routes");
const authRoutes = require("./src/routes/auth.routes");
const emailRoutes = require("./src/routes/email.routes");

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://patitasfelices7.netlify.app",
  "https://patitasfelices-backend.onrender.com",
  "https://patitas-felices-ten.vercel.app",
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

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/mercadopago", mercadopagoRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en el puerto ${port}`);
});

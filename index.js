require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const mercadopagoRoutes = require("./src/routes/mercadopago.routes");

require("./src/db/config.db");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./src/routes/index.routes");
app.use("/api", router);

app.use("/api", require("./src/routes/auth.routes"));
app.use("/api", require("./src/routes/email.routes"));
app.use("/api/mercadopago", mercadopagoRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en el puerto ${port}`);
});

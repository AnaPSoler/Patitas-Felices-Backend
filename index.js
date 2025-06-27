require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

require("./src/db/config.db"); 

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", require("./src/routes/auth.routes")); 

app.listen(port, () => {
  console.log("✅ Servidor backend corriendo en el puerto", port);
});

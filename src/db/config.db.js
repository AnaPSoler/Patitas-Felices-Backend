const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_CONNECT;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB correctamente"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

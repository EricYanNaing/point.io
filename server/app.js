const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// routes import
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

// Global Middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// routes
app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000);
  console.log("Server is running at port 4000");
});

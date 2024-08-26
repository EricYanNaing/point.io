const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");

// routes import
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

const storageConfig = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});
const filterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

// Global Middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfig, fileFilter: filterConfig }).array(
    "product_images"
  )
);

// routes
app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000);
  console.log("Server is running at port 4000");
});

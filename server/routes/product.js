const { Router } = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth");
const productMiddleware = require("../controllers/product");

const router = Router();

// add product Post
// Post create
router.post(
  "/create-product",
  authMiddleware,
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Product Name must be provided."),
  body("product_description")
    .trim()
    .notEmpty()
    .withMessage("Product Description must be provided."),
  body("product_price")
    .trim()
    .notEmpty()
    .withMessage("Product Price must be provided."),
  body("product_category")
    .trim()
    .notEmpty()
    .withMessage("Product Category must be provided."),
  body("product_usedFor")
    .trim()
    .notEmpty()
    .withMessage("Product Price must be provided."),
  body("product_details")
    .isArray()
    .withMessage("Product Details must be array."),
  productMiddleware.addNewProduct
);

module.exports = router;

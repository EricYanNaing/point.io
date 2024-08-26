const { Router } = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth");
const productController = require("../controllers/product");

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
  productController.addNewProduct
);

// GET --> get all products by a seller
router.get("/products", authMiddleware, productController.getAllProducts);

// GET --> get single product
router.get("/products/:id", authMiddleware, productController.getOldProduct);

// POST --> update product
router.post(
  "/update-product",
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
  productController.updateProduct
);

// POST --> delete product
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

// Upload images
router.post("/upload", authMiddleware, productController.uploadImages);

module.exports = router;

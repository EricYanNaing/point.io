const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

const router = Router();

// --> create new user
// Post -> /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name must be provided.")
      .isLength({ min: 3 })
      .withMessage("Name must have 3 words."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be provided.")
      .isLength({ min: 5 })
      .withMessage("Password must have 5 words."),
    body("email").trim().isEmail().withMessage("Valid Email must be provided."),
  ],
  authController.register
);

// --> login  user
// Post -> /register
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be provided."),
    body("email").trim().isEmail().withMessage("Valid Email must be provided."),
  ],
  authController.login
);

// --> Check user is login
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;

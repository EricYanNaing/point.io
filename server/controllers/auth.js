const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, password } = req.body;

  try {
    // user already exist
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      throw new Error("Uesr already exist.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      name,
      password: hashPassword,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(409).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  try {
    // is email exist
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      throw new Error("User credential wrong.");
    }

    //check password
    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
      throw new Error("User credential wrong.");
    }

    // create jwt token
    const token = jwt.sign({ userId: userDoc._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      isSuccess: true,
      message: "User login succes.",
      token,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

// Check user is login
exports.checkCurrentUser = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.userId).select("email name role");
    if (!userDoc) {
      throw new Error("User is not unauthorized.");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "User is authorized.",
      userDoc,
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

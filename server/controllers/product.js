const { response } = require("express");
const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dv5muchdi",
  api_key: "173331153966774",
  api_secret: process.env.CLOUD_API,
});

exports.addNewProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_usedFor,
    product_details,
  } = req.body;

  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      category: product_category,
      price: product_price,
      usedFor: product_usedFor,
      details: product_details,
      seller: req.userId,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Product is added to sell-list.",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });

    if (productDocs.length) {
      return res.status(200).json({
        isSuccess: true,
        message: "Products",
        productDocs,
      });
    } else {
      return res.status(404).json({
        isSuccess: false,
        message: "Products not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getOldProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  try {
    const productDoc = await Product.findOne({ _id: req.params.id });

    if (productDoc) {
      return res.status(200).json({
        isSuccess: true,
        productDoc,
      });
    } else {
      return res.status(404).json({
        isSuccess: false,
        message: "Products not found",
      });
    }
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
      product_usedFor,
      product_details,
      seller_id,
      product_id,
    } = req.body;

    if (req.userId.toString() !== seller_id) {
      throw new Error("Authroization Failed. ");
    }
    const productDoc = await Product.findOne({ _id: product_id });
    productDoc.name = product_name;
    productDoc.description = product_description;
    productDoc.price = product_price;
    productDoc.category = product_category;
    productDoc.usedFor = product_usedFor;
    productDoc.details = product_details;

    productDoc.save();
    return res.status(200).json({
      isSuccess: true,
      message: "Product details are updated.",
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findOne({ _id: id });

    if (!productDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: error.message,
      });
    }

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Authroization Failed. ");
    }

    // https://res.cloudinary.com/dv5muchdi/image/upload/v1724738216/z3ha6rgzap1don0cec6u.png
    if (productDoc.images && Array.isArray(productDoc.images)) {
      const deletePromise = productDoc.images.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );

        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) {
              reject(new Error("Destroy failed."));
            } else {
              resolve(result);
            }
          });
        });
      });

      await Promise.all(deletePromise);
    }

    await Product.findByIdAndDelete(id);

    return res.status(202).json({
      isSuccess: true,
      message: "Product is deleted",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

// upload images
exports.uploadImages = async (req, res, next) => {
  console.log(req.files);

  const productImages = req.files;
  const productId = req.body.product_id;
  let secureArrayUrl = [];

  try {
    productImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if (!err) {
          const url = result.secure_url;
          secureArrayUrl.push(url);

          if (productImages.length === secureArrayUrl.length) {
            await Product.findByIdAndUpdate(productId, {
              $push: { images: secureArrayUrl },
            });
            return res.status(200).json({
              isSuccess: true,
              message: "Product is uploaded successfully.",
              secureArrayUrl,
            });
          }
        } else {
          throw new Error("Cloud upload failed.");
        }
      });
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

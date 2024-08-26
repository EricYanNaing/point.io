const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    details: {
      type: Array,
    },
    usedFor: {
      required: true,
      type: String,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const productModel = model("Product", ProductSchema);
module.exports = productModel;

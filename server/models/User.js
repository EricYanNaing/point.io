const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      default: "user",
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = model("User", UserSchema);
module.exports = userModel;

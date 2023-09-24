const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    carts: [
      {
        food: { type: mongoose.SchemaTypes.ObjectId, ref: "Food" },
        unit: { type: Number },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

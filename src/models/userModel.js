const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      nonEmpty: true,
      type: String,
      required: true,
    },
    email: {
      nonEmpty: true,
      type: String,
      unique: true,
    },
    phone: {
      nonEmpty: true,
      required: true,
      type: String,
    },
    password: {
      nonEmpty: true,
      type: String,
      required: true,
    },
    referalId: {
      nonEmpty: true,
      default: "",
      type: String,
    },
    key: {
      nonEmpty: true,
      default: "",
      type: String,
    },
    start: {
      nonEmpty: true,
      default: false,
      type: Boolean,
    },
    boost: {
      nonEmpty: true,
      default: false,
      type: Boolean,
    },
    coins: {
      nonEmpty: true,
      default: 0.0, // default to a floating-point value
      type: Number,
      min: 0, // minimum value
      max: Number.MAX_SAFE_INTEGER, // maximum value
    },
    money: {
      nonEmpty: true,
      default: 0.0, // default to a floating-point value
      type: Number,
      min: 0, // minimum value
      max: Number.MAX_SAFE_INTEGER, // maximum value
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;

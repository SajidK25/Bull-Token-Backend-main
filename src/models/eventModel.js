const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    nonEmpty: true,
    type: String,
    required: true,
  },
  url: {
    nonEmpty: true,
    type: String,
    unique: true,
  },
  time: {
    nonEmpty: true,
    type: String,
  },
  image: {
    nonEmpty: true,
    type: String,
  },
  closed: {
    default: false,
    nonEmpty: true,
    type: Boolean,
  },
});

const EventModel = mongoose.model("events", UserSchema);

module.exports = EventModel;

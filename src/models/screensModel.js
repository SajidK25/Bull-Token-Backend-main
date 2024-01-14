const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  screens: {
    nonEmpty: true,
    type: Boolean,
    required: true,
  },
});

const ScreenModel = mongoose.model("screens", UserSchema);

module.exports = ScreenModel;

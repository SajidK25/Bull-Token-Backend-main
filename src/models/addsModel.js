const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  showAdds: {
    nonEmpty: true,
    type: Boolean,
    required: true,
  },
});

const AddModel = mongoose.model("adds", UserSchema);

module.exports = AddModel;

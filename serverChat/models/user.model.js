const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  name: { type: String, require: true },
  profilePicture: { type: String, default: "" },
  about: { type: String, default: "" },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;

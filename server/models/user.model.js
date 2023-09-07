import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  email: { type: String, require: true },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;

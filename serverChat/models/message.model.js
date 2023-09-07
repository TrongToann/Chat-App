const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    senderId: { type: String, ref: "Users", require: true },
    recieverId: { type: String, ref: "Users", require: true },
    type: { type: String, default: "text" },
    message: { type: String, require: true },
    messageStatus: { type: String, default: "sent" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);

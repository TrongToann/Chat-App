const AuthRouter = require("./AuthRoutes");
const messageRouter = require("./MessageRoutes");
const express = require("express");
function router(app) {
  app.use("/uploads/images", express.static("uploads/images"));
  app.use("/auth", AuthRouter);
  app.use("/message", messageRouter);
}
module.exports = router;

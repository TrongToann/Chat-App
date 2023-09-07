const express = require("express");
const MessageController = require("../controller/MessageController");
const multer = require("multer");
const router = express.Router();

const uploadImage = multer({ dest: "uploads/images" });

router.post("/", MessageController.addMessage);
router.get("/load/:from/:to", MessageController.getMessage);
router.post(
  "/add-image-message",
  uploadImage.single("image"),
  MessageController.addImageMessage
);
router.post(
  "/get-initial-contacts/:from",
  MessageController.getInitialContactWithMessages
);

module.exports = router;

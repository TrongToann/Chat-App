const express = require("express");
const authRouter = require("../controller/AuthController");
const router = express.Router();

router.post("/checkUser", authRouter.checkUser);
router.post("/registerUser", authRouter.registerUser);
router.get("/", authRouter.getAllUser);

module.exports = router;

import express from "express";
import authRouter from "../controllers/AuthController";
const router = express.Router();

router.post("/", authRouter);

module.exports = router;

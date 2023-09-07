import mongoose from "mongoose";
import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/main.router";
dotenv.config();
mongoose
  .connect(process.env.ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect DB"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(express.json());
router(app);
app.use((error, req, res, next) => {
  res.status(error.status || 400).send({
    error: {
      code: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
app.listen(3939, (req, res) => {
  console.log("Server Running on port 3939");
});

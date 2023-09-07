import AuthRouter from "../routes/AuthRoutes";
function router(app) {
  app.use("/", AuthRouter);
}
module.exports = router;

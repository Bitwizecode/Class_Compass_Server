const { Router } = require("express");
const {
  register,
  login,
  forgotPasswordSendOtp,
  verifyOtp,
  changePassword,
} = require("../controller/auth.controller");

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  res.send("Auth router");
});

authRouter.post("/register", register);
authRouter.post("/forgot-password", forgotPasswordSendOtp);
authRouter.post("/login", login);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/change-password", changePassword);

module.exports = authRouter;

const {Router} = require("express");
const { register, login } = require("../controller/auth.controller");

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  res.send("Auth router");
});

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
 
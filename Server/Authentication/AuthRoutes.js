const express = require("express");
const userRouter = express.Router();

const {
  register,
  login,
  logout,
  myData,
  getAllUsers,
} = require("./AuthController");
const IsUser = require("../middleware/JWT");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/mydata", IsUser, myData);
userRouter.get("/users", IsUser, getAllUsers);
userRouter.get("/logout", logout);

module.exports = userRouter;

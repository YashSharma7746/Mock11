const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { email, password, name, isAdmin } = req.body;
  try {
    let already = await userModel.find({ email, password });
    if (already.length > 0) {
      res.status(201).send({ msg: "User is already registered" });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        let newUser = new userModel({
          email,
          password: hash,
          name,
          isAdmin,
        });
        newUser.save();
        res.status(201).send({ msg: "New User has been created" });
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    console.log(user, "a");
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(201).send({
            msg: "Login Successully",
            token: jwt.sign({ userID: user._id }, "mock11"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(201).send({ msg: "Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { userRouter };

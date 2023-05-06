const express = require("express");
const orderRouter = express.Router();
const { orderModel } = require("../model/order.model");
const jwt = require("jsonwebtoken");

orderRouter.get("/orders", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "mock11");
  try {
    if (decoded.userId) {
      let result = await orderModel.find();
      res.status(200).send({ msg: "Success", data: result });
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

orderRouter.post("/order", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "mock11");
  try {
    if (decoded.userId) {
      const newBook = new orderModel(req.body);
      await newBook.save();
      res.status(201).send({ msg: "New order has been placed" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { orderRouter };

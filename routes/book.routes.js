const express = require("express");
const bookRouter = express.Router();
const { bookModel } = require("../model/book.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
bookRouter.get("/books", async (req, res) => {
  const { category, author } = req.query;
  try {
    if (category && author) {
      let result = await bookModel.find({ category, author });
      res.status(200).send({ msg: "Success", data: result });
    }
    if (category) {
      let result = await bookModel.find({ category });
      res.status(200).send({ msg: "Success", data: result });
    } else {
      let result = await bookModel.find();
      res.status(200).send({ msg: "Success", data: result });
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});
bookRouter.get("/books/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    let result = await bookModel.find({ _id });
    res.status(200).send({ msg: "Successf", data: result });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});
bookRouter.use(auth);

bookRouter.post("/books", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "mock11");
  console.log(decoded);
  try {
    if (decoded.userID) {
      const newBook = new bookModel(req.body);
      await newBook.save();
      res.status(201).send({ msg: "New Book has been added" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDU2MGE3NmIyMDQxNTUzMDMzOWJiYmUiLCJpYXQiOjE2ODMzNjA1Nzh9.eDiD9KeFpIrg3OslCMAH413Ndr8oG2-66pAM72Q4pNk
bookRouter.patch("/books/:id", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "mock11");
  try {
    if (decoded.userID) {
      await bookModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(204).send({ msg: "Sucesfully Updated" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

bookRouter.delete("/books/:id", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "mock11");
  try {
    if (decoded.userID) {
      await bookModel.findByIdAndDelete(req.params.id);
      res.status(202).send({ msg: "Sucessfully Deleted" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { bookRouter };

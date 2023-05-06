const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://yash10072000:sharma@cluster0.rw2l1xp.mongodb.net/mock11"
);

module.exports = {
  connection,
};

//mongodb+srv://yash10072000:<password>@cluster0.rw2l1xp.mongodb.net/

const express = require("express");
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { bookRouter } = require("./routes/book.routes");
const { orderRouter } = require("./routes/order.routes");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use(auth);
app.use("/order", orderRouter);
app.listen(4500, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server is running at port 4500");
});

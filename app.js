const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require('./Routes/user.cjs')
const bookRouter = require('./Routes/book.cjs')

const app = express();
app.use(bodyParser.json());

const url =
  "mongodb://meg:12meg12@ac-bed79vg-shard-00-00.hrttmyl.mongodb.net:27017,ac-bed79vg-shard-00-01.hrttmyl.mongodb.net:27017,ac-bed79vg-shard-00-02.hrttmyl.mongodb.net:27017/meg0?ssl=true&replicaSet=atlas-vq0d1i-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url);
    console.log("connected to mongo DB");
  } catch (err) {
    console.log("error while connect to mongo" + err);
    process.exit();
  }
};
connectDB();

app.use("/", userRouter);
app.use('/', bookRouter)

app.listen(7001);

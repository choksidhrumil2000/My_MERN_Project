const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const { authRoutes, userRoutes, productRoutes } = require("./routes/");
const errorHandler = require("./middleware/erroHandler.js");

const app = express();

console.log("connecting to MOngodb.......");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("successfully connected to mongodb database");
  })
  .catch((err) => {
    console.log("Error in connecting Database.....", err);
  });

app.use(cors())({ origin: ["https://my-mern-project-nine.vercel.app/"] }); //allow requests from frontend......
app.use(express.json()); //parse JSON request.......

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Running on ${process.env.PORT}.....`);
});

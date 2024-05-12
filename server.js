require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

// routes
app.use("/api", route);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {});
  })

  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome mojeje sdfsd appp to the app" });
// });

// app.listen(process.env.PORT, () => {
//   console.log("watch PORT");
// });

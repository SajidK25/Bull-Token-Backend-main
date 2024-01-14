const mongoose = require("mongoose");
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const dbName = "BullToken";

mongoose

  .connect(
    `mongodb+srv://${userName}:${password}@cluster0.pgsxl42.mongodb.net/BullToken`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Connection error");
  });

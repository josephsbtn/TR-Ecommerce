const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://josephsebastian2505:080107@cluster0.8qnvp.mongodb.net/RoS";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Mongo DB connection Successful");
  })
  .catch((err) => {
    console.error("Mongo DB connection Failed:", err);
  });

module.exports = mongoose;

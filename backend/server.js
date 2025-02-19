const express = require("express");
const cors = require("cors");

const app = express();

const dbConfig = require("./db");

const userRoute = require("./routes/userRoute");
const catRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const historyRoute = require("./routes/historyRoute");
const itemRoute = require("./routes/item");

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use("/api/users", userRoute);
app.use("/api/categories", catRoute);
app.use("/api/cart", cartRoute);
app.use("/api/history", historyRoute);
app.use("/api/items", itemRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started using nodemon on port ${port}`)
);

const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
});

const historyModel = mongoose.model("History", historySchema);
module.exports = historyModel;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  payment: {
    type: Boolean,
    default: false,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;

const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");
const Pembayaran = require("../models/historyPembayaran");

router.post("/getUserCart", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.body.userid,
      payment: false,
    });
    res.send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/addItem", async (req, res) => {
  const { item } = {
    userId: req.body.userid,
    itemId: req.body.itemId,
    quantity: req.body.quantity,
  };
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        item: [{ itemId: item.itemId, quantity: item.quantity }],
      });
    }

    res.send(addedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

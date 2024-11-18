const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");
const Pembayaran = require("../models/historyPembayaran");

router.get("/getUserCart", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.body.userid });
    res.send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

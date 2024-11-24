const express = require("express");
const router = express.Router();

const Cart = require("../models/cart");
const Item = require("../models/item");
const Pembayaran = require("../models/historyPembayaran");

router.post("/getUserCart", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.body.userId,
      payment: false,
    })
      .populate("userId")
      .populate({ path: "items.itemID" });
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
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ itemID: item.itemId, quantity: item.quantity }],
      });
      return res.send(cart);
    }
    cart.items.push({ itemID: item.itemId, quantity: item.quantity });
    res.send(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/increaseItem", async (req, res) => {
  const itemId = req.body.itemID;
  const cartId = req.body.cartID;
  try {
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    const item = await Cart.find((i) => i.itemID.toString() === itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not found!" });
    }

    item.quantity += 1;

    await cart.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/decreaseItem", async (req, res) => {
  const itemId = req.body.itemID;
  const cartId = req.body.cartID;
  try {
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    const item = await Cart.find((i) => i.itemID.toString() === itemId);
    if (!item) {
      return res.status(400).json({ message: "Item not found!" });
    }

    item.quantity -= 1;

    await cart.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

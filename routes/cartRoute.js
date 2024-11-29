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
  const { userId, items } = req.body;
  try {
    if (!userId || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: items.map((item) => ({
          itemID: item.itemID,
          quantity: item.quantity || 1,
        })),
      });
    } else {
      items.forEach((newItem) => {
        if (!newItem.itemID) {
          throw new Error("ItemID is missing in one of the items");
        }

        const existingItem = cart.items.find(
          (item) => item.itemID === newItem.itemID
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity || 1;
        } else {
          cart.items.push({
            itemID: newItem.itemID,
            quantity: newItem.quantity || 1,
          });
        }
      });
    }
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.error("Error adding items to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
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

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
  const { userId, items, subtotal } = req.body;

  try {
    if (!userId || !items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let cart = await Cart.findOne({ userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: items.map((item) => ({
          itemID: item.itemID,
          quantity: item.quantity || 1,
        })),
        total: subtotal,
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

      cart.total += subtotal;
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.error("Error adding items to cart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/deleteItem", async (req, res) => {
  const userId = req.body.userId;
  const itemID = req.body.itemID;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    const itemIndex = cart.items.findIndex((item) => item.itemID === itemID);

    if (itemIndex == -1) {
      return res.status(400).json({ message: "Item not found in cart!" });
    }

    const deletedItem = items.splice(itemIndex, 1);
    res.send(deletedItem);

    await cart.save();
  } catch (error) {
    console.error("Error deleting item from cart:", error.message);
    res.status(500).json({
      message: "Error deleting item from cart:",
      error: error.message,
    });
  }
});

router.put("/increaseItem", async (req, res) => {
  const { itemID, cartID } = req.body;
  try {
    const updateResult = await Cart.updateOne(
      { _id: cartID, "items.itemID": itemID },
      { $inc: { "items.$.quantity": 1 } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ message: "Cart or item not found!" });
    }

    res.status(200).json({ message: "Item quantity updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/decreaseItem", async (req, res) => {
  const itemId = req.body.itemID;
  const cartId = req.body.cartID;
  try {
    const updateResult = await Cart.updateOne(
      { _id: cartID, "items.itemID": itemID },
      { $inc: { "items.$.quantity": -1 } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ message: "Cart or item not found!" });
    }

    await cart.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

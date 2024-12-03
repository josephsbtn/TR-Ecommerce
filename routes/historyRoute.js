const express = require("express");
const router = express.Router();

const History = require("../models/historyPembayaran");
const Cart = require("../models/cart");
const User = require("../models/user");

router.get("/getAllHistory", async (req, res) => {
  try {
    const history = await History.find({}).populate({
      path: "cartID",
      model: "Cart",
      populate: [
        {
          path: "items.itemID",
          model: "Item",
        },
        {
          path: "userId",
          model: "User",
          select: "name",
        },
      ],
    });

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No history found" });
    }

    res.send(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/addHistory", async (req, res, next) => {
  try {
    const paid = new History({
      cartID: req.body.cartId,
      PaymentMethod: req.body.PaymentMethod,
    });
    await paid.save();
    res.status(200).json({ message: "Payment history added successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

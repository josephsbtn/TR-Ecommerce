const express = require("express");
const router = express.Router();

const History = require("../models/historyPembayaran");

router.get("/getAllHistory", async (req, res) => {
  try {
    const history = await History.find({});
    res.send(history);
  } catch (error) {
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

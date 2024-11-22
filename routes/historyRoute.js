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

router.post("/addHistory", async (req, res) => {
  try {
    const paid = new History({
      cartID: req.body.cartId,
    });
    const newPaid = await History.bulkSave();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

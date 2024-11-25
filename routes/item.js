const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.get("/getAllItem", async (req, res) => {
  try {
    const allItems = await Item.find({});
    res.send(allItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/addItem", async (req, res) => {
  const item = {
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  };
  try {
    const isSame = await Item.findOne({ name: item.name });
    if (isSame) {
      return res.status(400).json({ message: "Item already exists" });
    }

    if (Number(item.price) < 100000) {
      return res
        .status(400)
        .json({ message: "Price cannot less than Rp 100.000" });
    }

    const newItem = await Item.create(item);
    res.send(newItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/getItemById", async (req, res) => {});

module.exports = router;

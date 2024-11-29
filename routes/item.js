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

router.get("/itemsById", async (req, res) => {
  const id = req.body.itemId;
  try {
    const item = await Item.findById(id);
    res.send(item);
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

router.post("/editItem", async (req, res) => {
  try {
    const id = req.body.itemId;
    const item = {
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    };

    const res = await Item.findByIdAndUpdate(id, item);
    res.send(res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

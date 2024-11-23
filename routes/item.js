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
    if (Item.findOne(item.name)) {
      return res.status(400).json({ message: "Item already exists" });
    }

    if (item.price < 1) {
      return res.status(400).json({ message: "Price cannot less than Rp 1" });
    }

    const newItem = new Item(item);
    res.send(newItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/getItemById", async (req, res) => {
  
})

module.exports = router;

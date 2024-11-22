const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/getallcategories", async (req, res) => {
  try {
    const cat = await Category.find({});
    res.send(cat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/addCategory", async (req, res) => {
  try {
    const { name } = req.body;
    const isSame = await Category.findOne({ name });
    if (isSame) {
      return res.status(500).json("Theres already a category with this name");
    }
    const cat = await Category.create({ name });
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteCategory", async (req, res) => {
  try {
    const { id } = req.body;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.send(deleteCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/updateCategory", async (req, res) => {
  const updatedCat = { name: req.body.name };
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.body.catId,
      updatedCat
    );
    res.send(updateCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.get("/getallcategories", async (req, res) => {
  try {
    const cat = await Category.find({});
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addCategory", async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.send(cat);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteCategory", async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.body.catId);
    res.send(deleteCategory);
  } catch (error) {
    console.log(error);
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
    res.send(error);
  }
});

module.exports = router;

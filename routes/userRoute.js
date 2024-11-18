const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/getallusers", async (req, res) => {
  try {
    const rooms = await User.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const newuser = new User({
    email: req.body.email,
    password: bcrypt.hash(req.body.password),
    username: req.body.username,
    fullname: req.body.fullname,
    isAdmin: req.body.isAdmin,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,
  });
  try {
    const user = await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

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
    const { email, password, username, fullname, phoneNumber } = req.body;

    try {
      const levelHash = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, levelHash);

      const newUser = new User({
        email,
        password: hashPass,
        username,
        fullname,
      phoneNumber,
      });

      const user = await newUser.save();
      res.send(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

router.post("/getUserById", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;

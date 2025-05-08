const express = require("express");

const Order = require("../models/Order");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(401).json("Server Error");
  }
});

module.exports = router;

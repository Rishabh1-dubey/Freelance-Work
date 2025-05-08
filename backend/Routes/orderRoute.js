const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//route GET /api/order/my-orders
//@desc GET logged-in user order
//@access Private

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    // sort by most recent created Order
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "NOt able to find the order" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "NOt able to find the order" });
  }
});

module.exports = router;

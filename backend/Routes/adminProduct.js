const express = require("express");

const Product = require("../models/Products");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, async (req, res) => {
  try {
    const adminprouct = await Product.find({});
    res.json(adminprouct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not able to fetch all Products" });
  }
});

module.exports = router;

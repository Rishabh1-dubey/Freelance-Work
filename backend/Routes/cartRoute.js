const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// route POST /api/cart
// @desc Add a product to cart
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // Product already exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: Number(product.price),
          size,
          color,
          quantity,
        });
      }

      // Recalculate total price safely
      cart.totalPrice = cart.products.reduce((acc, item) => {
        const price = Number(item.price);
        const qty = Number(item.quantity);
        return acc + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create new cart for guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined, // ✅ Correct field name
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: Number(product.price),
            size,
            color,
            quantity,
          },
        ],
        totalPrice: Number(product.price) * Number(quantity),
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json("Something went wrong: " + error.message);
  }
});

module.exports = router;

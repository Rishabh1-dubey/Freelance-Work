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

    // Determine user is loggesIN or Guest
    let cart = await getCart(userId, guestId);

    // if the cart is exist , update it
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
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate total price safely
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
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
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json("Server Error  ", error.message);
  }
});

//@route PUT/api/cart
//@desc update product quantity in the cart for a guset or logged-in user
// @accesss public

router.put("/update-cart", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(400).json({ message: "Cart is not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      //update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove products if qunatity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res
        .status(401)
        .json({ message: "not able to Update your products" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

//@route DELETE/api/cart
//@desc delete product quantity in the cart for a guset or logged-in user
// @accesss public

router.delete("/remove-cart", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(400).json({ message: "Cart is not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res
        .status(401)
        .json({ message: "not able to Update your products" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// displaying all the cart

router.get("/all", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(500).json({ message: "Not able to render you Cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// router Post api/cart/merge
//desc merge guest cart into under cart to login
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // if the items exists in the user cart , update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // otherwise add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: "Sever Error" });
        }
        res.status(200).json(userCart);
      } else {
        //IF the user has no existing cart, assing the guest cart to user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
      res.status(404).json({ message: "Guest cart not  found" });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Server Error " + error})
  }
});
module.exports = router;

const express = require("express");
const app = express();
const Product = require("../models/Products");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();
app.use(express.json());



router.post("/products", protect, admin, async (req, res) => {
  const {
    name,
    description,
    price,
    discountedPrice,
    countINStock,
    sku,
    category,
    brand,
    sizes,
    colors,
    collection,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    width,
    dimensions,
  } = req.body;

  try {
    const product = new Product({
      user: req.user._id,
      name,
      description,
      price,
      discountedPrice,
      countINStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      width,
      dimensions,
    });

    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (error) {
    console.log("Not able to reendering the Product details", error);
    res.status(400).send("Not able to reendering the Product details" + error);
  }
});

// @route PUT/api/product/:id
//@desc Update an existing ProductID
//@access Private/Admin

router.put("/products/:id", protect, admin, async (req, res) => {
  const {
    name,
    description,
    price,
    discountedPrice,
    countINStock,
    sku,
    category,
    brand,
    sizes,
    colors,
    collection,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    width,
    dimensions,
  } = req.body;
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // Update the Existing
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountedPrice = discountedPrice || product.discountedPrice;
      product.countINStock = countINStock || product.countINStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collection = collection || product.collection;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.images = images || product.images;
      product.tags = tags || product.tags;
      product.width = width || product.width;
      product.dimensions = dimensions || product.dimensions;

      //   Save the Updated Product after making changes
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: "Product is not Found" });
    }
  } catch (error) {
    console.log("Not able to reendering the Product details", error);
    res.status(400).send("Not able to reendering the Product details" + error);
  }
});

//  @route detete/api/product/:id
//@desc Update an existing ProductID
//@access Private/Admin

router.delete("/products/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      await product.deleteOne();
      res.status(200).json({ message: "Product Removed" });
    }
  } catch (error) {
    console.log("something went wrong" + error);
    res.status(400).json({ message: "not able to delelte the user" });
  }
});

module.exports = router;

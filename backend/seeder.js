const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Products");
const User = require("./models/User");

const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

// function to seed data

const seedData = async () => {
  try {
    // Delete all the existing Data
    await Product.deleteMany();
    await User.deleteMany();

    //   create a deafauly adming user id
    const NewUser = await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    // Assign the dafault userID to each product
    const userID = NewUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("error Occured", error);
    process.exit(1)
  }
};

seedData()
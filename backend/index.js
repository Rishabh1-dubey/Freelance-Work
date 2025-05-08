const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoutes.js");
const cartRoute = require("./Routes/cartRoute.js");
const checkoutRoute = require("./Routes/checkoutRoute.js");
const orderRoute = require("./Routes/orderRoute.js");
const uploadRoutes = require("./Routes/uploadRoutes.js");
const subscribe = require("./Routes/subscribe.js");

//  ----------------------- Admin section -------------------------------
const adminProduct = require("./Routes/adminProduct.js");
const adminUser = require("./Routes/adminUser.js");
const adminOrderProduct = require("./Routes/adminOrderRoute.js");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

// importting our database config ffile
const ConnectDb = require("./config/db.js");

const PORT = process.env.PORT || 3000;
console.log(PORT);

// Connected with Database\
ConnectDb();

app.get("/", (req, res) => {
  console.log("server is running");
  res.send("hello i am on");
});

// Api Routes
app.use("/api/users", userRoute);
app.use("/api/users", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribe);

//-------------------------- Admin section  -----------------------------
app.use("/api/admin/user", adminUser);
app.use("/api/admin/product", adminProduct);
app.use("/api/admin/order", adminOrderProduct);

app.listen(PORT, () => {
  console.log(`hello man server on runngin on port http://localhost:${PORT}`);
});

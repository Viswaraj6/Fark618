const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔴 MongoDB Connection (IMPORTANT: replace password if needed)
mongoose.connect(mongodb+srv://viswaraj6_db_user:IAkwXvTcUbIkrrEl@cluster0.n3jqyc9.mongodb.net/?appName=Cluster0)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// 📦 Product Schema
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  image: String
});

// 🧾 Order Schema
const Order = mongoose.model("Order", {
  products: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});


// ➕ Add Product
app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send("Product Added ✅");
});

// 📥 Get Products
app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// 🛒 Place Order
app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send("Order Placed ✅");
});

// 📦 Get Orders
app.get("/orders", async (req, res) => {
  const data = await Order.find();
  res.json(data);
});

// 🚀 Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});

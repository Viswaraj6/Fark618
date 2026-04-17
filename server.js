const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (FIXED)
mongoose.connect("mongodb+srv://viswaraj6_db_user:IAkwXvTcUbIkrrEl@cluster0.n3jqyc9.mongodb.net/fark618?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

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
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("Product Added ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});

// 📥 Get Products
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 🛒 Place Order
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("Order Placed ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});

// 📦 Get Orders
app.get("/orders", async (req, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ IMPORTANT (Render port fix)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

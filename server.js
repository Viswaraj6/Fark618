const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://viswaraj6_db_user:IAkwXvTcUbIkrrEl@cluster0.n3jqyc9.mongodb.net/fark618?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));


// 📦 Product Schema (FIXED)
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  stock: Number,
  image: String
});

// 🧾 Order Schema
const Order = mongoose.model("Order", {
  products: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});


// ➕ ADD PRODUCT (FIXED SAFE)
app.post("/add-product", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.body.image
    });

    await product.save();

    res.send("Product Added ✅");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// 📥 GET PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});


// ✏️ UPDATE PRODUCT (NEW)
app.put("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.body.image
    });

    res.send("Updated ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});


// ❌ DELETE PRODUCT (NEW)
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});


// 🛒 PLACE ORDER
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("Order Placed ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});


// 📦 GET ORDERS
app.get("/orders", async (req, res) => {
  try {
    const data = await Order.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});


// 🚀 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

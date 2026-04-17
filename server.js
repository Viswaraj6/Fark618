const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connect (FIXED)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error ❌", err));


// 📦 Product Schema
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


// ➕ ADD PRODUCT
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product Added ✅", product });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding product");
  }
});


// 📥 GET PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching products");
  }
});


// ✏️ UPDATE
app.put("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});


// ❌ DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted ✅");
  } catch (err) {
    res.status(500).send(err);
  }
});


// 🛒 ORDER
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
    res.json(data || []);
  } catch (err) {
    res.status(500).send(err);
  }
});


// 🟢 ROOT
app.get("/", (req, res) => {
  res.send("FARK618 API Running 🚀");
});


// 🚀 START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

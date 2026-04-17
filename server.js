const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connect (ENV பயன்படுத்துறோம்)
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


// 🟢 ROOT
app.get("/", (req, res) => {
  res.send("FARK618 API Running 🚀");
});


// ➕ ADD PRODUCT
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.body.image
    });

    await product.save();

    res.json({
      success: true,
      message: "Product Added ✅",
      product
    });

  } catch (err) {
    console.log("Add Error:", err);
    res.status(500).json({ success: false, error: err });
  }
});


// 📥 GET PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();

    res.json(data || []);

  } catch (err) {
    console.log("Fetch Error:", err);
    res.status(500).send("Error fetching products");
  }
});


// ✏️ UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated ✅");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// ❌ DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted ✅");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// 🛒 PLACE ORDER
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.json({
      success: true,
      message: "Order Placed ✅"
    });

  } catch (err) {
    console.log("Order Error:", err);
    res.status(500).send(err);
  }
});


// 📦 GET ORDERS
app.get("/orders", async (req, res) => {
  try {
    const data = await Order.find();
    res.json(data || []);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// 🚀 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

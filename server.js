const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📦 PRODUCTS
let products = [
  {
    id: 1,
    name: "Blue Shirt",
    price: 799,
    stock: 10,
    image: "https://via.placeholder.com/300"
  }
];

// 📦 ORDERS
let orders = [];

// ================= PRODUCTS =================

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ADD product
app.post("/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

// UPDATE product
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.map(p =>
    p.id === id ? { ...p, ...req.body } : p
  );

  res.json({ message: "Updated" });
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.filter(p => p.id !== id);

  res.json({ message: "Deleted" });
});

// ================= ORDERS =================

// SAVE order
app.post("/orders", (req, res) => {
  const newOrder = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.total
  };

  orders.push(newOrder);
  res.json({ message: "Order placed" });
});

// GET all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// ================= SERVER =================

app.listen(3000, () => console.log("Server running"));

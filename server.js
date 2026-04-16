const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 TEMP DATABASE (RAM)
let products = [
  {
    id: 1,
    name: "Blue Shirt",
    price: 799,
    stock: 10,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
  },
  {
    id: 2,
    name: "Black T-Shirt",
    price: 499,
    stock: 20,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  }
];

// ✅ GET
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ ADD
app.post("/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  products.push(newProduct);
  res.json(newProduct);
});

// ✅ DELETE
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "Deleted" });
});

// ✅ UPDATE
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.map(p =>
    p.id === id ? { ...p, ...req.body } : p
  );

  res.json({ message: "Updated" });
});

app.listen(3000, () => console.log("Server running"));

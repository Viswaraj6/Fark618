const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("FARK 618 Backend Running");
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Blue Shirt", price: 799, stock: 10 },
    { id: 2, name: "Black T-Shirt", price: 499, stock: 20 }
  ]);
});

app.listen(5000, () => console.log("Server running"));

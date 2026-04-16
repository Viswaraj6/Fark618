const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));

const products = [
  { id: 1, name: "Blue Shirt", price: 799, stock: 10 },
  { id: 2, name: "Black T-Shirt", price: 499, stock: 20 }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/", (req, res) => {
  res.send("FARK 618 Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

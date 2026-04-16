const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/products", (req, res) => {
  res.json([
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
    },
    {
      id: 3,
      name: "White Shirt",
      price: 899,
      stock: 5,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c"
    },
    {
      id: 4,
      name: "Grey Hoodie",
      price: 1299,
      stock: 8,
      image: "https://images.unsplash.com/photo-1602810316547-4b7c6d8f9e0a"
    }
  ]);
});

app.listen(3000, () => console.log("Server running"));

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
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"
    },
    {
      id: 2,
      name: "Black T-Shirt",
      price: 499,
      stock: 20,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
      id: 3,
      name: "White Shirt",
      price: 899,
      stock: 5,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"
    },
    {
      id: 4,
      name: "Grey Hoodie",
      price: 1299,
      stock: 8,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    }
  ]);
});

app.listen(3000, () => console.log("Server running"));

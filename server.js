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
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Black T-Shirt",
      price: 499,
      stock: 20,
      image: "https://via.placeholder.com/150"
    }
  ]);
});

app.listen(3000, () => console.log("Server running"));

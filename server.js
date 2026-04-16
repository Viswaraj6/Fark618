const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Blue Shirt", price: 799 },
    { id: 2, name: "Black T-Shirt", price: 499 }
  ]);
});

app.listen(3000, () => console.log("Server running"));

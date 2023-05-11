const express = require("express");
const app = new express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/api", (reg, res) => {
  res.send("HEllo world!");
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log("Express API running: " + PORT);
});
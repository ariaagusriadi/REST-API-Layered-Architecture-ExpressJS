// Layer untuk handle request (req) dan response (res)
// biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductByID,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductByID(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // string

    await deleteProductById(productId);

    res.send("delete product success");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    if (
      !(
        productData.description &&
        productData.image &&
        productData.name &&
        productData.price
      )
    ) {
      res.status(400).send("some field are missing");
      return;
    }

    const product = await editProductById(productId, productData);

    res.send({
      data: product,
      message: "edit data success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductById(productId, productData);
    res.send({
      data: product,
      message: "edit data success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

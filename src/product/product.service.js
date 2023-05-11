// Service layer bertujuan untuk handle bsinees logic
// kenapa di pisah? suapaya tanggung jawabnya ter-isolate, dan
// functionya reusable

const {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductByID = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw new Error("name has to be unique");
  }

  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductByID(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductByID(id);
  const product = await editProduct(id, productData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  deleteProductById,
  editProductById,
};

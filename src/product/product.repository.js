// berkomunikasi dengan database
// boleh pakai ORM, boleh raw query
// suapaya apa? suapaya kalau mau ganti ORM tinggal edit di file ini aja

const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  return product;
};

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      image: newProductData.image,
      price: newProductData.price,
      description: newProductData.description,
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  return product;
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  findProductByName,
  deleteProduct,
  editProduct,
};

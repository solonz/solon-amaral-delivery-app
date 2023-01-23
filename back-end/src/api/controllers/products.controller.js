const productService = require('../services/products.service');

const getProducts = async (req, res) => {
  // faz a requisição de produtos e recebe os produtos ou erro de token
  const result = await productService.getProducts();
  res.status(200).json(result);
};

module.exports = {
  getProducts,
};

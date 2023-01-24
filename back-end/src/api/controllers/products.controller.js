const productService = require('../services/products.service');

const getProducts = async (req, res) => {
  // faz a requisição de produtos e recebe os produtos ou erro de token
  const result = await productService.getProducts();
  res.status(200).json(result);
};

const getImages = async (req, res) => {
  const { imgName } = req.params;
  console.log(imgName);
  const image = await productService.getImage(imgName);
  res.status(200).json(image);
}

module.exports = {
  getProducts,
  getImages,
};

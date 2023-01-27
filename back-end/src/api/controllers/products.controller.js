const path = require('path');
const productService = require('../services/products.service');

const getProducts = async (req, res) => {
  // faz a requisição de produtos e recebe os produtos ou erro de token
  const result = await productService.getProducts();
  res.status(200).json(result);
};

const getImages = (req, res) => {
  const { imgName } = req.params;
  console.log(req.params);
  const options = {
    root: path.join(__dirname, '../images'),
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'image/jpeg',
    },
  };
  res.sendFile(imgName, options);
};

module.exports = {
  getProducts,
  getImages,
};

const { Product } = require('../../database/models');

// pega todos os produtos da tabela products do banco de dados;
const getProducts = async () => Product.findAll();

module.exports = {
  getProducts,
};

const { Product } = require('../../database/models');
const fs = require('fs');

// pega todos os produtos da tabela products do banco de dados;
const getProducts = async () => Product.findAll();

const getImage = (imgName) => {
  return new Promise((resolve, reject) => {
      fs.readFile(`${imgName}`, (err, data) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(data);
      });
  });
};

module.exports = {
  getProducts,
  getImage,
};

const fs = require('fs');
const { Product } = require('../../database/models');

// pega todos os produtos da tabela products do banco de dados;
const getProducts = async () => Product.findAll();

const getImage = (imgName) => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/../images/${imgName}`, (err, data) => {
        if (err) {          
            reject(err);
            return;
        }
        resolve(data);
    });
});
module.exports = {
  getProducts,
  getImage,
};

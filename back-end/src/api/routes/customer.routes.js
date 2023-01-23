const express = require('express');
const productsController = require('../controllers/products.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /customer...

routers.get('/products', productsController.getProducts);

module.exports = routers;

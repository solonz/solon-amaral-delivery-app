const express = require('express');
const productsController = require('../controllers/products.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /images...
routers.get('/:imgName', productsController.getImages);

module.exports = routers;

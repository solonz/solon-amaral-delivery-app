const express = require('express');
// const productsController = require('../controllers/products.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /manage...

routers.get('/manage');

module.exports = routers;

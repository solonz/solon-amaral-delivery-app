const express = require('express');
const productsController = require('../controllers/products.controller');
const ordersController = require('../controllers/orders.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

const routers = express.Router();

// as rotas abaixo são complemento da rota /customer...

routers.get('/products', authMiddleWare.validateToken,
    (req, res) => productsController.getProducts(req, res));
routers.get('/orders', authMiddleWare.validateToken,
    (req, res) => ordersController.getOrders(req, res));

module.exports = routers;

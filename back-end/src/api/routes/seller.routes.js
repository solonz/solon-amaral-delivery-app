const express = require('express');
const sellerController = require('../controllers/seller.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /login
// quanto é apenas /, quer dizer que a rota é apenas /login

routers.get('/orders', sellerController.getOrders);

module.exports = routers;

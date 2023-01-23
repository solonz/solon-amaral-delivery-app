const express = require('express');
const loginController = require('../controllers/login.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /login
// quanto é apenas /, quer dizer que a rota é apenas /login

routers.post('/', loginController.login);

module.exports = routers;

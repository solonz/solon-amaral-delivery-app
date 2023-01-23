const express = require('express');
const registerController = require('../controllers/register.controller');

const routers = express.Router();

// as rotas abaixo são complemento da rota /register
// quanto é apenas /, quer dizer que a rota é apenas /register

routers.post('/', registerController.register);

module.exports = routers;
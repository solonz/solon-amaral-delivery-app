const express = require('express');
const registerController = require('../controllers/register.controller')
const routers = express.Router();
 
// as rotas abaixo são complemento da rota /customer...

routers.get('/register', registerController.register);

module.exports = routers;

const express = require('express');
const authMiddleWare = require('../middlewares/auth.middleware');
const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');
const customerRouter = require('./customer.routes');
const imagesRouter = require('./images.routes');

const routers = express.Router();

// as rotas abaixo chamam os routers que possuem as rotas especificas do grupo

routers.use('/login', loginRouter);
routers.use('/register', registerRouter);
// a rota customer possui uma validação de token em todas as rotas especificas
routers.use('/customer', authMiddleWare.validateToken, customerRouter);
routers.use('/images', authMiddleWare.validateToken, imagesRouter);

module.exports = routers;

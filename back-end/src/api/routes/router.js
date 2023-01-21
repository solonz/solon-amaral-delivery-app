const express = require('express');
const loginRouter = require('./login.routes');
const registerRouter = require('./register.routes');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/register', registerRouter);

module.exports = routers;

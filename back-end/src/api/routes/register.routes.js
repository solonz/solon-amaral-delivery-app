const express = require('express');
const registerController = require('../controllers/register.controller');

const routers = express.Router();

routers.post('/', registerController.register);

module.exports = routers;
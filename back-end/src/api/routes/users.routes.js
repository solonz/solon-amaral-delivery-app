const express = require('express');
const usersController = require('../controllers/users.controller');

const routers = express.Router();

routers.get('/', usersController.getUsers);

module.exports = routers;
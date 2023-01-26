const usersController = require('../controllers/users.controller');
const express = require('express');

const routers = express.Router();

routers.get('/', usersController.getUsers);

module.exports = routers;
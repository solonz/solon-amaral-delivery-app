const express = require('express');
const salesController = require('../controllers/sales.controller');

const routers = express.Router();

routers.post('/new', salesController.includeSale);

module.exports = routers;

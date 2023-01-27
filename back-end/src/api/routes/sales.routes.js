const express = require('express');
const salesController = require('../controllers/sales.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

const routers = express.Router();

routers.post('/new', authMiddleWare.validateToken, 
    (req, res) => salesController.includeSale(req, res));

module.exports = routers;
const express = require('express');
const cors = require('cors'); // instalado para funcionar requisições HTTP de outra porta
require('express-async-errors'); // instalado para funcionar o errorMiddleWare
const routers = require('./routes/router');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(cors());

app.use(express.json());

app.use(routers);
// app.use('/static', express.static(__dirname + '/images'));

app.use(errorMiddleware); // pega os erros lançados e retornam em formato de válido

module.exports = app;

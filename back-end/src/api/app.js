const express = require('express');
const cors = require('cors'); // instalado para funcionar requisições HTTP de outra porta
require('express-async-errors'); // instalado para funcionar o errorMiddleWare
const routers = require('./routes/router');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(cors({allowedHeaders: '*', origin: '*', methods: '*'}));

app.use(express.json());

app.use(routers);

app.use(errorMiddleware); // pega os erros lançados e retornam em formato de válido

module.exports = app;

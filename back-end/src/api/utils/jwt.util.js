const jwt = require('jsonwebtoken');
const fs = require('fs');

// função que cria um token com as informações do usuário.
const createToken = async (credentials) => {
    const secret = await fs.promises.readFile('jwt.evaluation.key', 'utf8');
    const token = jwt.sign({ credentials }, secret, {
        expiresIn: '1d',
        algorithm: 'HS256', 
    });
    return token;
};

// função que valida um token
const validateToken = (token) => {
    let secret;
    fs.readFile('evaluation.key', 'utf8', (err, data) => {
      if (err) throw err;
      secret = data;
    });
    try {
        const { data } = jwt.verify(token, secret);

        return data;
    } catch (error) {
        const errorOutput = {
          status: 401,
          message: 'Expired or invalid token',
        };
        throw errorOutput;
    }
};

module.exports = { createToken, validateToken };
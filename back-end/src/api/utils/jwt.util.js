const jwt = require('jsonwebtoken');
const fs = require('fs');

// função que cria um token com as informações do usuário.
const createToken = async (credentials) => {
    // le o arquivo jwt.evaluation.key
    const secret = await fs.promises.readFile('jwt.evaluation.key', 'utf8');
    // cria um token com as credenciais e a senha lida
    const token = jwt.sign({ credentials }, secret, {
        expiresIn: '1d',
        algorithm: 'HS256', 
    });
    return token;
};

// função que valida um token
const validateToken = async (token) => {
    // le o arquivo jwt.evaluation.key
    const secret = await fs.promises.readFile('jwt.evaluation.key', 'utf8');
    try {
        // tenta verificar o token, se for válido, retorna as informações do token
        const { credentials } = jwt.verify(token, secret);
        return credentials;
    } catch (error) {
        // se não for válido, retorna o erro
        const errorOutput = {
          status: 401,
          message: 'Expired or invalid token',
        };
        throw errorOutput;
    }
};

module.exports = { createToken, validateToken };

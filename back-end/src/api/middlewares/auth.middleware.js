const jwtUtil = require('../utils/jwt.util');

// este middleware valida se o req.header tem um token válido
// deve ser usado em todas as páginas que demanda validação de token
const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = {
      status: 404,
      message: 'Token not found',
    };
    throw error;
  }


  const user = await jwtUtil.validateToken(authorization);

  req.user = user;
  next();
};

module.exports = {
  validateToken,
};

const { User } = require('../../database/models');
const { hashPassword } = require('../utils/cryptoUtils');
const jwtUtil = require('../utils/jwt.util');

const validateLogin = async ({ email, password }) => {
  // encontra um usuário no banco de dados
  const user = await User.findOne({ where: { email } });
  // transforma a senha recebida do front em hash e compara com o usuário encontrado
  if (!user || user.password !== hashPassword(password)) {
    // caso não encontra o usuário ou a senha esteja errado, lança o erro abaixo
    const error = {
      status: 404,
      message: 'Not Found',
    };
    throw error;
  }

  // desestrutura os dados do usuário removendo a rota 
  const { password: _, ...userWithoutPassword } = user.dataValues;
  // cria um token com os dados do usuário sem o password
  const token = await jwtUtil.createToken(userWithoutPassword);
  // retorna um objeto com os dados do usuário com um token e sem password
  return {
    ...userWithoutPassword,
    token,
  };
};

module.exports = {
  validateLogin,
};

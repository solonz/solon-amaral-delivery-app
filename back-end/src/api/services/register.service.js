const { Sequelize } = require('sequelize');
const { User } = require('../../database/models');
const { hashPassword } = require('../utils/cryptoUtils');
const jwtUtil = require('../utils/jwt.util');

const { Op } = Sequelize;

// registra um novo usuário
const RegisterUser = async ({ name, email, password, role = 'customer' }) => {
  // busca usuários com o mesmo nome ou email
  const existingUser = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] },
  });
  // verifica se a busca encontrou algum usuário e se sim, retorna um erro
  if (existingUser) {
    const error = { status: 409, message: 'Conflict' };
    throw error;
  }

  // se não encontrou, cria um usuário com a senha já criptografada
  const user = await User.create({
    name,
    email,
    password: hashPassword(password),
    role,
  });

  // pega os dados do usuário criado removendo a senha
  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  // cria um token com os dados sem a senha
  const token = await jwtUtil.createToken(userWithoutPassword);
  // retorna um objeto com os dados e um token
  return { ...userWithoutPassword, token };
};

module.exports = {
  RegisterUser,
};

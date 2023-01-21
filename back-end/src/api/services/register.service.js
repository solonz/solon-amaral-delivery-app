const { Sequelize } = require('sequelize');
const { User } = require('../../database/models');
const { hashPassword } = require('../utils/cryptoUtils');
const jwtUtil = require('../utils/jwt.util');

const { Op } = Sequelize;

const RegisterUser = async ({ name, email, password, role = 'customer' }) => {
  // busca usuários com o mesmo nome ou email e retorna um erro
  const existingUser = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] },
  });
  if (existingUser) {
    const error = { status: 409, message: 'Conflict' };
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password: hashPassword(password),
    role,
  });

  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  const token = await jwtUtil.createToken(userWithoutPassword);
  return { ...userWithoutPassword, token };
};

module.exports = {
  RegisterUser,
};

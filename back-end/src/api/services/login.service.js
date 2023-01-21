const { User } = require('../../database/models');
const { hashPassword } = require('../utils/cryptoUtils');
const jwtUtil = require('../utils/jwt.util');

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== hashPassword(password)) {
    const error = {
      status: 404,
      message: 'Not Found',
    };
    throw error;
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  const token = await jwtUtil.createToken(userWithoutPassword);
  return {
    ...userWithoutPassword,
    token,
  };
};

module.exports = {
  validateLogin,
};

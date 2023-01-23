const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  // faz a solicitação e recebe um token que vai ser utilizado no front
  const token = await loginService.validateLogin({ email, password });
  
  return res.status(200).json(token);
};

module.exports = {
  login,
};

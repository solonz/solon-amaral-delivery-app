const registerService = require('../services/register.service');

// função genérica, serve pra pagina register ou pro admin registrar novos usuários
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const createdUser = await registerService.RegisterUser({
    name,
    email,
    password,
    role,
  });

  return res.status(201).json(createdUser);
};

module.exports = {
  register,
};

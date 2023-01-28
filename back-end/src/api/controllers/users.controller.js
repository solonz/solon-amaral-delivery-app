const userService = require('../services/users.service');

const getUsers = async (_req, res) => {
  const result = await userService.getUsers();
  res.status(200).json(result);
};

module.exports = {
    getUsers,
};

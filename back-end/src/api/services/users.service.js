const { User } = require('../../database/models');

// pega todos os usuários da tabela users do banco de dados;
const getUsers = async () => await User.findAll();

module.exports = {
    getUsers,
};

const crypto = require('crypto');

// função para codificar a senha recebida no formato md5
const hashPassword = (password) => {
  const md5 = crypto.createHash('MD5');
  md5.update(password);
  const hash = md5.digest('hex');
  return hash;
};

module.exports = {
  hashPassword,
};

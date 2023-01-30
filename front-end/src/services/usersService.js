import { getCredentials } from '../utils/localStorageHelper';

const getUsers = async () => {
  const credentials = getCredentials();
  const { token } = credentials;
  if (!token) {
    return 'token not found';
  }
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  const response = await fetch('http://localhost:3001/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  });
  const json = await response.json();
  return json;
};

export default {
  getUsers,
};

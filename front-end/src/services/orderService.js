import { getCredentials } from '../utils/localStorageHelper';

const orderRegister = async (shopCart) => {
  const credentials = getCredentials();
  const { token } = credentials;
  if (!token) {
    return 'token not found';
  }
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  const response = await fetch('http://localhost:3001/sales/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(shopCart),
  });
  const json = await response.json();
  return json;
};

export default {
  orderRegister,
};

import { getCredentials } from '../utils/localStorageHelper';

// pegar produtos no back
const getProducts = async () => {
  // pega dados do usuário no localStorage
  const credentials = getCredentials();
  // pega token nos dados pegos
  const { token } = credentials;
  // verifica se existe um token no localStorage
  if (!token) return 'Token not found';
  // realiza a requisição dos produtos enviando token no headers
  const response = await fetch('http://localhost:3001/customer/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // converte dados recebidos
  const json = await response.json();
  // verifica se o retorno foi que o login não é valido e retorna mensagem de erro
  if (json.message === 'Expired or invalid token') return 'Expired or invalid token';
  // se não houver erro, retorna array de produtos
  return json;
};

const getOrder = async () => {
  const credentials = getCredentials();
  const { token } = credentials;
  if (!token) {
    return 'token not found';
  }
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  const response = await fetch('http://localhost:3001/customer/orders', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  });
  const json = await response.json();
  return json;
};

export default {
  getProducts,
  getOrder,
};

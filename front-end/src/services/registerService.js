import { getCredentials } from '../utils/localStorageHelper';

const RegisterService = async (credentials) => {
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const json = await response.json();
  return json;
};

const adminRegisterService = async (credentials) => {
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  // pega dados do usuário no localStorage
  const localCredentials = getCredentials();
  // pega token nos dados pegos
  const { token } = localCredentials;
  // verifica se existe um token no localStorage
  if (!token) return 'Token not found';
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify(credentials),
  });
  const json = await response.json();
  return json;
};

export default {
  RegisterService,
  adminRegisterService,
};

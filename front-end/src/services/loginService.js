const LoginService = async (credentials) => {
  // realiza uma requisição ao back enviando dados do usuário e recebendo um objeto
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const json = await response.json();
  return json;
};

export default {
  LoginService,
};

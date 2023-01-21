const RegisterService = async (credentials) => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const json = await response.json();
  return json;
};

export default {
  RegisterService,
};

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/loginService';

const { logIn } = require('../utils/localStorageHelper');

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true); // condição para habilita/desabilitar botão de login
  const [notFound, setNotFound] = useState(false); // condição para habilitar/desabilitar mensagem de erro de login

  const navigate = useNavigate();

  // realiza verificação de email e senha sempre que altera nos inputs
  useEffect(() => {
    const toggleBtn = () => {
      const SIX = 6;
      // validador de email
      const doEmailValidation = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail);
      // cria constante verificando email e se a senha tem 6 dígitos
      const dataValidation = doEmailValidation
        && inputPassword.length >= SIX;
      setDisabledBtn(!dataValidation);
    };
    toggleBtn();
  }, [inputEmail, inputPassword]);

  // gerenciador de formulário controlado
  function handleChange({ target }) {
    if (target.name === 'email-input') {
      setInputEmail(target.value);
    } else {
      setInputPassword(target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // solicita login no backEnd com email e senha digitados
    const loginReturn = await LoginService.LoginService(
      { email: inputEmail, password: inputPassword },
    );
    // verifica se o retorno do back é positivo, se não for, mostra a mensagem oculta na tela
    if (loginReturn.message === 'Not Found') return setNotFound(true);
    // salva dados do login no localStorage
    logIn(loginReturn);
    // redireciona para a página de produtos
    navigate('/customer/products');
  }

  return (
    <div className="login_page">
      <h1 className="login_title">Delivery App</h1>
      <form
        className="login_form"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="email-input">
          Email:
          <br />
          <input
            type="email"
            id="email-input"
            name="email-input"
            value={ inputEmail }
            onChange={ handleChange }
            data-testid="common_login__input-email"
          />
        </label>
        <br />
        <label htmlFor="password-input">
          Password:
          <br />
          <input
            type="password"
            id="password-input"
            name="password-input"
            value={ inputPassword }
            onChange={ handleChange }
            data-testid="common_login__input-password"
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={ disabledBtn }
          className="login_btn"
          data-testid="common_login__button-login"
        >
          Login
        </button>
        <button
          type="button"
          className="register_btn"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
        <span
          hidden={ !notFound }
          data-testid="common_login__element-invalid-email"
        >
          Usuário ou senha não encontrado.
        </span>
      </form>
    </div>
  );
}

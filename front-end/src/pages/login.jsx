import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/loginService';

const { saveCredential } = require('../utils/localStorageHelper');

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const toggleBtn = () => {
      const SIX = 6;
      const doEmailValidation = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail);
      const dataValidation = doEmailValidation
        && inputPassword.length >= SIX;
      setDisabledBtn(!dataValidation);
    };
    toggleBtn();
  }, [inputEmail, inputPassword]);

  function handleChange({ target }) {
    if (target.name === 'email-input') {
      setInputEmail(target.value);
    } else {
      setInputPassword(target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const loginReturn = await LoginService.LoginService(
      { email: inputEmail, password: inputPassword },
    );
    console.log(loginReturn);
    if (loginReturn.message === 'Not Found') return setNotFound(true);
    saveCredential(loginReturn);
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

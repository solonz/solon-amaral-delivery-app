import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerService from '../services/registerService';
import { logIn } from '../utils/localStorageHelper';

export default function Register() {
  // estados controlados
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true); // gerenciador de botão habilitado/desabilitado
  const [exists, setExists] = useState(true); // gerenciador de mensagem de caso o nome ou email já seja cadastrado

  const navigate = useNavigate();

  useEffect(() => {
    const toggleBtn = () => {
      // verificações controladas de nome, senha e email para desabilitar botão
      const SIX = 6;
      const TWELVE = 12;
      const doEmailValidation = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail);
      const dataValidation = doEmailValidation
        && inputPassword.length >= SIX
        && inputName.length >= TWELVE;
      setDisabledBtn(!dataValidation);
    };
    toggleBtn();
  }, [inputName, inputEmail, inputPassword]);

  // gerenciador de componentes controlados
  function handleChange({ target }) {
    if (target.name === 'email-input') {
      setInputEmail(target.value);
    }
    if (target.name === 'name-input') {
      setInputName(target.value);
    }
    if (target.name === 'password-input') {
      setInputPassword(target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // envia dados para o back end e recebe retorno
    const registerReturn = await registerService.RegisterService(
      { name: inputName, email: inputEmail, password: inputPassword },
    );
    // confere se o retorno diz que o cadastro ja existe e habilita mensagem de erro
    if (registerReturn.message === 'Conflict') return setExists(false);
    // salva dados do usuário com o token no localStorage
    logIn(registerReturn);
    // redireciona para página de produtos
    navigate('/customer/products');
  }

  return (
    <div className="register_page">
      <h1 className="register_title">Delivery App</h1>
      <form
        className="register_form"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="name-input">
          Nome:
          <br />
          <input
            id="name-input"
            name="name-input"
            value={ inputName }
            onChange={ handleChange }
            data-testid="common_register__input-name"
          />
        </label>
        <br />
        <label htmlFor="email-input">
          Email:
          <br />
          <input
            type="email"
            id="email-input"
            name="email-input"
            value={ inputEmail }
            onChange={ handleChange }
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={ disabledBtn }
          className="register_btn"
          data-testid="common_register__button-register"
        >
          register
        </button>
        <span
          hidden={ exists }
          data-testid="common_register__element-invalid_register"
        >
          Usuário ou senha não encontrado.
        </span>
      </form>
    </div>
  );
}

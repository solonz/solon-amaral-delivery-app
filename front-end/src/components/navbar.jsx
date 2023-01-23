import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCredentials, logOut } from '../utils/localStorageHelper';

export default function NavBar() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  // ao carregar a página, pega dados do usuário no localStorage e salva no estado local
  useEffect(() => {
    const credentials = getCredentials();
    setUserName(credentials.name);
    setUserRole(credentials.role);
  }, []);

  // apaga dados do localStorage e volta para página de login
  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };

  // esta função retorna os links utilizados para o role customer
  const customerOptions = () => (
    <div>
      <a
        className="nav_button"
        href="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </a>
      <a
        className="nav_button"
        href="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </a>
    </div>
  );

  const adminOptions = () => (
    <div>
      <span
        className="nav_button"
        data-testid="customer_products__element-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </span>
    </div>
  );

  // criar funções que retornam links de seller e admin

  // ao retornar o navBar, verifica qual role e envia somente as opções corretas
  return (
    <>
      { userRole === 'customer' && customerOptions() }
      { userRole === 'administrator' && adminOptions() }
      <div>
        <span
          className="nav_button"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </span>
        <a
          className="nav_button"
          href="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogOut }
        >
          Sair
        </a>
      </div>
    </>
  );
}

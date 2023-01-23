import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

export const customerContext = createContext();

function CustomerProvider({ children }) {
  // cria o estado que vai salvar o carrinho
  const [shopCart, setShopCart] = useState([]);

  const value = React.useMemo(() => ({
    shopCart,
    setShopCart,
  }));

  return (
    <customerContext.Provider value={ value }>
      {children}
    </customerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default CustomerProvider;

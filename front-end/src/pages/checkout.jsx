import React, { useState, useContext, useEffect } from 'react';
import NavBar from '../components/navbar';
import { getCartShop, rmItemFromCart } from '../utils/localStorageHelper';
import { customerContext } from '../context/customerProvider';

// Página genérica para ser criada
export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const { shopCart, setShopCart } = useContext(customerContext);

  useEffect(() => {
    const shopFromLocal = getCartShop();
    setShopCart(shopFromLocal);
    setIsLoading(false);
  }, []);

  const getTotal = () => {
    // console.log(shopCart);
    let total = 0;
    shopCart.forEach((product) => {
      total += (product.price * product.quantity);
    });
    return total.toFixed(2);
  };

  const handleRemove = (e) => {
    setIsLoading(true);
    const { id } = e.target;
    const newCart = rmItemFromCart(id);
    setShopCart(newCart);
    setIsLoading(false);
  };

  const productRow = (index, product) => (
    <tr key={ index }>
      <td data-testid={ `customer_checkout__element-order-table-item-number-${index}` }>
        {index + 1}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {product.name}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${index}` }>
        {product.quantity}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }>
        {product.price}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {(product.quantity * product.price).toFixed(2)}
      </td>
      <td>
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
          id={ product.id }
          onClick={ handleRemove }
        >
          Remover
        </button>
      </td>
    </tr>
  );

  // // função que pega produtos do back e salva no estado local
  // useEffect(() => {
  //   async function getData() {
  //     // recebe produtos ou retorno da validação do token do back
  //     const receivedProducts = await customerService.getProducts();
  //     // verifica se o token é invalido ou não foi enviado, realiza logout e redireciona para /login
  //     if (receivedProducts === ('Invalid Token' || 'Token not found')) {
  //       logOut();
  //       setShopCart([]);
  //       navigate('/login');
  //     } else {
  //       // salva produtos no estado local e habilita para ser mostrado na tela
  //       setProducts(receivedProducts);
  //       setIsLoading(false);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <>
      <div>
        { !isLoading && <NavBar /> }
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && shopCart.map((product, index) => productRow(index, product))}
        </tbody>
      </table>
      <span data-testid="customer_checkout__element-order-total-price">
        {getTotal()}
      </span>
      <form
        className="register_form"
        // onSubmit={ handleSubmit }
      >
        <label htmlFor="pessoa-vendedora">
          P. Vendedora Responsável:
          <br />
          <select
            name="pessoa-vendedora"
            type="pessoa-vendedora"
            id="pessoa-vendedora"
            // value={ inputSeller }
            // onChange={ handleChange }
            data-testid="customer_checkout__select-seller"
          >
            <option value="seller">Vendedor</option>
          </select>
        </label>
        <br />
        <label htmlFor="order-address">
          Endereço:
          <br />
          <input
            type="order-address"
            id="order-address"
            name="order-address"
            // value={ inputAddress }
            // onChange={ handleChange }
            data-testid="customer_checkout__input-address"
          />
        </label>
        <br />
        <label htmlFor="order-address-number">
          Número:
          <br />
          <input
            type="order-address-number"
            id="order-address-number"
            name="order-address-number"
            // value={ inputNumber }
            // onChange={ handleChange }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <br />
        <button
          type="submit"
          // disabled={ disabledBtn }
          className="submit-order"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

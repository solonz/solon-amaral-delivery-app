import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import { getCartShop, rmItemFromCart } from '../utils/localStorageHelper';
import { customerContext } from '../context/customerProvider';
import orderService from '../services/orderService';
import usersService from '../services/usersService';

// Página genérica para ser criada
export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const { shopCart, setShopCart } = useContext(customerContext);
  const [registeredSellers, setRegisteredSellers] = useState([]);
  const [inputSeller, setInputSeller] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputAddressNumber, setInputAddressNumber] = useState('');
  const [inputSellerId, setInputSellerId] = useState('');
  const [inputTotalValue, setInputTotalValue] = useState(0);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const allUsers = await usersService.getUsers();
    const sellers = allUsers.filter((user) => user.role === 'seller');
    setRegisteredSellers(sellers);
    setInputSeller(sellers[0].name);
    setInputSellerId(sellers[0].id);
  };

  function getTotalPrice() {
    let total = 0;
    shopCart.forEach((products) => { total += (products.price * products.quantity); });
    const totalBRL = total
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setInputTotalValue(totalBRL);
  }

  useEffect(() => {
    const shopFromLocal = getCartShop();
    setShopCart(shopFromLocal);
    setIsLoading(false);
    getAllUsers();
    getTotalPrice();
  }, []);

  const getTotal = () => {
    // console.log(shopCart);
    let total = 0;
    shopCart.forEach((product) => {
      total += (product.price * product.quantity);
    });
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleRemove = (e) => {
    setIsLoading(true);
    const { id } = e.target;
    const newCart = rmItemFromCart(id);
    setShopCart(newCart);
    setIsLoading(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // envia dados para o back end e recebe retorno
    const orderRegisterReturn = await orderService.orderRegister(
      { shopCart: { shopCart },
        sellerId: inputSellerId,
        // PENDENTE - O ID SEMPRE É NULL MESMO SE PASSARMOS UM NUMERO FIXO
        deliveryAddress: inputAddress,
        deliveryNumber: inputAddressNumber,
        totalPrice: inputTotalValue,
        status: 'Pendente' },
    );
    console.log(inputTotalValue);
    const orderID = orderRegisterReturn.id;
    navigate(`/customer/orders/${orderID}`);
  }

  function getSellerId(sellerName) {
    const seller = registeredSellers
      .find((eachSeller) => (
        eachSeller.name === sellerName || eachSeller.name === inputSeller
      ));
    return seller.id;
  }

  function handleChange({ target }) {
    if (target.name === 'pessoa-vendedora') {
      const sellerId = getSellerId(target.value);
      console.log(sellerId);
      setInputSellerId(sellerId);
      setInputSeller(target.value);
    }
    if (target.name === 'order-address') {
      setInputAddress(target.value);
    }
    if (target.name === 'order-address-number') {
      setInputAddressNumber(target.value);
    }
  }

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
        {(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }>
        {(product.quantity * product.price)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
        onSubmit={ handleSubmit }
      >
        <label htmlFor="pessoa-vendedora">
          P. Vendedora Responsável:
          <br />
          <select
            name="pessoa-vendedora"
            type="pessoa-vendedora"
            value={ inputSeller }
            onChange={ handleChange }
            data-testid="customer_checkout__select-seller"
          >
            {registeredSellers.map((seller) => (
              <option key={ seller.id } id={ seller.id }>
                {seller.name}
              </option>))}
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
            value={ inputAddress }
            onChange={ handleChange }
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
            value={ inputAddressNumber }
            onChange={ handleChange }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <br />
        <button
          type="submit"
          // disabled={ disabledBtn }
          className="submit-order"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleSubmit }
        >
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

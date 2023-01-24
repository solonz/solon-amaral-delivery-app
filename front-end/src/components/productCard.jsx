import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { customerContext } from '../context/customerProvider';
import { addToCart, rmFromCart, addValueToCart } from '../utils/localStorageHelper';

// este componente é o modelo de cada card de produtos que vai aparecer na página
export default function ProductCard({ // desestrutura o produto recebido como parâmetro
  id,
  name,
  price,
  urlImage,
}) {
  const [quantity, setQuantity] = useState(0); // cria estado local para quantidade

  const { shopCart, setShopCart } = useContext(customerContext); // pega o estado do contexto de customer

  // função para gerenciamento de quantidade
  const getQuantity = () => {
    let currProduct;
    // verifica se existe produtos no carrinho do estado customer
    if (shopCart.length) {
      // se existir, procura pelo produto deste card e atribui a uma variável temporária
      currProduct = shopCart.find((product) => product.id === id);
    }
    // verifica se o produto foi encontrado no carrinho
    if (currProduct) {
      // atribui a quantidade salva no estado customer ao estado local
      setQuantity(currProduct.quantity);
    } else {
      // se não encontrar, atribui o valor zero
      setQuantity(0);
    }
  };

  // atualiza a quantidade sempre que o carrinho for atualizado
  useEffect(() => {
    getQuantity();
  }, [shopCart]);

  // PRECISO FAZER COM QUE AO ENTRAR NA PÁGINA AS QTDS ESTEJAM ATUALIZADAS
  // useEffect(() => {
  //   getQuantity();
  // }, [quantity]);

  // função para gerenciar a quantidade
  const handleQuantity = (e) => {
    // pega o valor do item que acionou a função
    const newValue = e.target.value;
    // verifica se o numero do input de number é inteiro
    if (e.target.name === 'qtdInCArt') {
      // altera informações do produto no carrinho conforme digitado no input
      const newCart = addValueToCart({ id, name, price, urlImage }, newValue);
      // atualiza o carrinho salvo no contexto customer
      setShopCart(newCart);
    }
    if (e.target.name === 'addToCart') {
      // incrementa 1 no produto no localStorage
      const newCart = addToCart({ id, name, price, urlImage });
      // atualiza o carrinho no contexto customer
      setShopCart(newCart);
    }
    if (e.target.name === 'rmFromCart') {
      // decrementa 1 no produto no localStorage
      const newCart = rmFromCart(id);
      setShopCart(newCart);
    }
  };

  return (
    <div>
      <div>
        <h3
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.toFixed(2).replace('.', ',') }
        </h3>
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <div>
        <div>
          <h4
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </h4>
        </div>
        <div>
          <button
            type="button"
            name="rmFromCart"
            value={ name }
            onClick={ handleQuantity }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="text"
            name="qtdInCArt"
            value={ quantity }
            onChange={ handleQuantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            type="button"
            name="addToCart"
            value={ name }
            onClick={ handleQuantity }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

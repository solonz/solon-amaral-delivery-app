import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerContext } from '../context/customerProvider';
import NavBar from '../components/navbar';
import ProductCard from '../components/productCard';
import customerService from '../services/customerService';
import { logOut } from '../utils/localStorageHelper';

export default function Products() {
  const [products, setProducts] = useState(); // estado para salvar produtos recebidos do back
  const [isLoading, setIsLoading] = useState(true); // estado que garante que só vai mostrar cards após retorno do back

  const { setShopCart } = useContext(customerContext); // contexto customer para pegar valores do carrinho e apagar carrinho no logout

  const navigate = useNavigate();

  // função que pega produtos do back e salva no estado local
  useEffect(() => {
    async function getData() {
      // recebe produtos ou retorno da validação do token do back
      const receivedProducts = await customerService.getProducts();
      // verifica se o token é invalido ou não foi enviado, realiza logout e redireciona para /login
      if (receivedProducts === ('Invalid Token' || 'Token not found')) {
        logOut();
        setShopCart([]);
        navigate('/login');
      } else {
        // salva produtos no estado local e habilita para ser mostrado na tela
        setProducts(receivedProducts);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div>
        <div>
          { !isLoading // verifica se produtos ja foram recebidos
            && products.map((product) => (<ProductCard // renderiza um card para cada produto recebido
              key={ product.id }
              id={ product.id }
              name={ product.name }
              price={ +product.price } // o + antes do valor converte string para number
              urlImage={ product.url_image }
            />))}
        </div>
      </div>
    </>
  );
}

export function logIn(credentials) {
  // salva dados do usuário no item 'user' do localStorage
  localStorage.setItem('user', JSON.stringify(credentials));
}

export function getCredentials() {
  // pega dados do usuário no item 'user' do localStorage
  return JSON.parse(localStorage.getItem('user'));
}

export function logOut() {
  // apaga dados do usuário e do carrinho do localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('cartShop');
}

export function addToCart(product) {
  // pega o carrinho do local storage
  const cart = JSON.parse(localStorage.getItem('cartShop')) || [];
  // confere se o produto já está no carrinho
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    // se o produto não existir no carrinho, cria ele e inclui no carrinho
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      urlImage: product.urlImage,
      quantity: 1,
    });
  }
  // Salva o carrinho novo no lugar do existente no local storage
  localStorage.setItem('cartShop', JSON.stringify(cart));
  return cart;
}

// export function addValueToCart(product, quantity) {
//   if (quantity <= 0
//     || undefined
//     || Number.isNaN(quantity)
//     || !Number.isInteger(parseInt(quantity, 10))) return;
//   // pega o carrinho do local storage
//   let cart = JSON.parse(localStorage.getItem('cartShop')) || [];
//   // confere se o produto já está no carrinho
//   const existingProduct = cart.find((p) => p.id === product.id);
//   // se o produto existir no carrinho, atualiza a quantidade para o valor fornecido
//   if (existingProduct) {
//     existingProduct.quantity = parseInt(quantity, 10);
//     // confere se a quantidade é zero
//     if (existingProduct.quantity <= 0) {
//       // se for zero, remove o produto do carrinho
//       cart = cart.filter((p) => p.id !== productId);
//     }
//   } else {
//     // se o produto não existir no carrinho, cria ele e inclui no carrinho
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       urlImage: product.urlImage,
//       quantity,
//     });
//   }
//   // Salva o carrinho novo no lugar do existente no local storage
//   localStorage.setItem('cartShop', JSON.stringify(cart));
//   return cart;
// }

export function addValueToCart(product, quantity) {
  // pega o carrinho do local storage
  let cart = JSON.parse(localStorage.getItem('cartShop')) || [];
  // confere se o produto já está no carrinho
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct
    && (quantity <= 0
    || undefined
    || Number.isNaN(quantity)
    || !Number.isInteger(parseInt(quantity, 10)))) {
    // se for zero, remove o produto do carrinho
    cart = cart.filter((p) => p.id !== product.id);
  } else if (existingProduct) {
    existingProduct.quantity = parseInt(quantity, 10);
  } else if (quantity > 0) {
    // se o produto não existir no carrinho, cria ele e inclui no carrinho
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      urlImage: product.urlImage,
      quantity,
    });
  }
  // Salva o carrinho novo no lugar do existente no local storage
  localStorage.setItem('cartShop', JSON.stringify(cart));
  return cart;
}

export function rmFromCart(productId) {
  // pega o carrinho do local storage
  let cart = JSON.parse(localStorage.getItem('cartShop')) || [];
  // encontra o carrinho no local
  const existingProduct = cart.find((p) => p.id === productId);
  if (existingProduct) {
    // remove 1 da quantidade do produto (botão -)
    existingProduct.quantity -= 1;
    // confere se a quantidade é zero
    if (existingProduct.quantity <= 0) {
      // se for zero, remove o produto do carrinho
      cart = cart.filter((p) => p.id !== productId);
    }
  }
  // Salva o carrinho novo no lugar do existente no local storage
  localStorage.setItem('cartShop', JSON.stringify(cart));
  return cart;
}

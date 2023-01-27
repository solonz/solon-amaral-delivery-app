const salesService = require('../services/sales.service');

// função genérica, serve pra pagina sales ou pro admin registrar novos usuários
const includeSale = async (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  const {
    shopCart,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    totalPrice,
    status,
  } = req.body;

  const createdSale = await salesService.createSale({
    id,
    shopCart,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    totalPrice,
    status,
  });
  
  return res.status(201).json(createdSale);
  };

module.exports = {
  includeSale,
};

const { Sale, SalesProduct } = require('../../database/models');

const createSale = async (shopCart) => {
const saleReturn = await Sale.create({ userId: shopCart.id,
  sellerId: shopCart.sellerId, 
  totalPrice: shopCart.totalPrice,
  deliveryAddress: shopCart.deliveryAddress,
  deliveryNumber: shopCart.deliveryNumber,
  status: shopCart.status,
  saleDate: new Date() });
if (saleReturn) {
  const salesProductPromises = shopCart.shopCart.map(async (product) => {
    await SalesProduct.create({ saleId: saleReturn.id,
      productId: product.id,
      quantity: product.quantity,
      price: product.price });
  });
  await Promise.all(salesProductPromises);
} else {
const error = { status: 404, message: 'Not Found' }; throw error;
} return saleReturn;
};
module.exports = {
createSale,
};

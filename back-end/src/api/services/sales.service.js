const { Sale, SalesProduct } = require('../../database/models');

const createSale = async (shopCart) => {
const saleReturn = await Sale.create({
  user_id: shopCart.id,
  seller_id: shopCart.sellerId,
  total_price: shopCart.totalPrice,
  delivery_address: shopCart.deliveryAddress,
  delivery_number: shopCart.deliveryNumber,
  status: shopCart.status,
  sale_date: new Date()
});

if (saleReturn) {
  const salesProductPromises = shopCart.shopCart.map(async (product) => {
    await SalesProduct.create({
      sale_id: saleReturn.id,
      product_id: product.id,
      quantity: product.quantity,
      price: product.price
    });
  });
await Promise.all(salesProductPromises);
} else {
const error = {
status: 404,
message: 'Not Found',
};
throw error;
}
return saleReturn;
};

module.exports = {
createSale,
};

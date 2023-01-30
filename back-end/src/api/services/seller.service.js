const { Sale } = require('../../database/models');

const getOrders = async (id) => {
  const orders = await Sale.findAll({
    where: { sellerId: id },
  });
  if (orders.length > 0) return orders;
  const error = {
    status: 404, message: 'No sales found',
  };
  throw error; 
};

module.exports = {
  getOrders,
};

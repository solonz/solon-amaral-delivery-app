const orderService = require('../services/orders.service');

const getOrders = async (req, res) => {
  const { id } = req.user;
  const result = await orderService.getOrders(id);
  console.log(result)
  res.status(200).json(result);
};

module.exports = {
    getOrders,
};

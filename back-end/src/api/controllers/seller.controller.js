const sellerService  = require("../services/seller.service");

const getOrders = async (req, res) => {
const id = req.user.id;
console.log(id);
const orders = await sellerService.getOrders( id );
res.status(200).json(orders);
};

module.exports = {getOrders};

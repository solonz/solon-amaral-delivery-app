const sellerService  = require("../services/seller.service");

const getOrders = async (req, res) => {
const { id } = req.user;
const orders = await sellerService.getOrders( id );
res.status(200).json(orders);
};

export default getOrders;

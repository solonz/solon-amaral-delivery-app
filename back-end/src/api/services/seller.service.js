const  { Sale }  = require('../../database/models');


const getOrders = async ( id ) => {
  const orders = await Sale.findAll( {
    where: { seller_id: id }
  })
  if(orders.length > 0) return orders;
  throw {
    status: 404, message:'No sales found'
  } 
};

module.exports = {
  getOrders,
};

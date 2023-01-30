const { Sale } = require('../../database/models');

const getOrders = async (id) => {
    const response = await Sale.findAll({
        where: { userId: id },
    });
    if (response.length > 0) return response;
    const error = { status: 404, message: 'No sales found' }; 
    throw error;
};

module.exports = {
    getOrders,
};

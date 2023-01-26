import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Componente genérico para ser criado
export default function SellerOrderCard({
  id,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  salesDate,
  status,

}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/seller/orders/${id}`);
  };

  return (
    <button
      onClick={ () => handleClick() }
      type="button"
    >
      <div
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        { deliveryNumber }
      </div>
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status}
      </div>
      <div
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        { salesDate }
      </div>
      <div
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        { totalPrice }
      </div>
      <div
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { deliveryAddress }
      </div>
    </button>

  );
}

SellerOrderCard.propTypes = {
  deliveryNumber: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  salesDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

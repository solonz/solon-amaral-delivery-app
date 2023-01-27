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
  const date = salesDate;
  const d1 = 8;
  const d2 = 10;
  const m1 = 5;
  const m2 = 7;
  const y1 = 2;
  const y2 = 4;
  const dateF = `${date.slice(d1, d2)}/${date.slice(m1, m2)}/${date.slice(y1, y2)}`;
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
        { id }
      </div>
      <div
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status}
      </div>
      <div
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        { dateF }
      </div>
      <div
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        {` R$ ${totalPrice.replace('.', ',')}` }
      </div>
      <div
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { `${deliveryAddress}, ${deliveryNumber}` }
      </div>
    </button>

  );
}

SellerOrderCard.propTypes = {
  deliveryNumber: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  salesDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

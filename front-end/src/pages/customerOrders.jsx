import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import customerService from '../services/customerService';

// Página genérica para ser criada
export default function CustomerOrders() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    const orders = await customerService.getOrder();
    setCustomerOrder(orders);
    return orders;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const response = newDate.toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
    return response;
  };

  const printOrders = (order) => (
    <a
      href={ `/customer/orders/${order.id}` }
      key={ order.id }
    >
      <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
        { order.id }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${order.id}` }
      >
        { order.status }

      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${order.id}` }
      >
        { formatDate(order.saleDate) }

      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${order.id}` }
      >
        { order.totalPrice.replace('.', ',') }

      </p>
    </a>
  );

  useEffect(() => {
    getOrders();
    setIsLoading(false);
  }, []);

  return (
    <>
      <header>
        { !isLoading && <NavBar />}
      </header>
      { !isLoading && customerOrder.map((order) => printOrders(order))}
    </>
  );
}

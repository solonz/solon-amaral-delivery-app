import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import sellerService from '../services/sellerService';
import NavBar from '../components/navbar';
import SellerOrderCard from '../components/sellerOrderCard';

export default function SellerOrders() {
  const [ordersArray, setOrdersArray] = useState([]);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await sellerService.getSales();
      setOrdersArray(orders);
    };
    fetchOrders();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <header>
        { !isLoading && <NavBar /> }
      </header>
      <div>
        { ordersArray.map((order) => (<SellerOrderCard
          key={ order.id }
          id={ order.id }
          status={ order.status }
          totalPrice={ order.totalPrice }
          deliveryAddress={ order.deliveryAddress }
          deliveryNumber={ order.deliveryNumber }
          salesDate={ order.saleDate }

        />))}
      </div>

    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Products from '../pages/products';
import Checkout from '../pages/checkout';
import CostumerDetail from '../pages/costumerDetail';
import CostumerOrders from '../pages/costumerOrders';
import SellerOrders from '../pages/sellerOrders';
import SellerDetail from '../pages/sellerDetail';
import AdminManage from '../pages/adminManage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/costumer/products" element={ <Products /> } />
        <Route path="/costumer/checkout" element={ <Checkout /> } />
        <Route path="/customer/orders/:id" element={ <CostumerDetail /> } />
        <Route path="/customer/orders" element={ <CostumerOrders /> } />
        <Route path="/seller/orders/:id" element={ <SellerDetail /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route path="/admin/manage" element={ <AdminManage /> } />
      </Routes>
    </BrowserRouter>
  );
}

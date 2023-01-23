import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomerProvider from '../context/customerProvider';
import Login from '../pages/login';
import Register from '../pages/register';
import Products from '../pages/products';
import Checkout from '../pages/checkout';
import CustomerDetail from '../pages/customerDetail';
import CustomerOrders from '../pages/customerOrders';
import SellerOrders from '../pages/sellerOrders';
import SellerDetail from '../pages/sellerDetail';
import AdminManage from '../pages/adminManage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route
          path="/customer/products"
          element={
            <CustomerProvider>
              <Products />
            </CustomerProvider>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <CustomerProvider>
              <Checkout />
            </CustomerProvider>
          }
        />
        <Route
          path="/customer/orders/:id"
          element={
            <CustomerProvider>
              <CustomerDetail />
            </CustomerProvider>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <CustomerProvider>
              <CustomerOrders />
            </CustomerProvider>
          }
        />
        <Route path="/seller/orders/:id" element={ <SellerDetail /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route path="/admin/manage" element={ <AdminManage /> } />
        <Route path="*" element={ <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

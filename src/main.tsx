import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import AddressPage from './features/address/pages/AddressPage.tsx';
import SaveAddressPage from './features/address/pages/SaveAddressPage.tsx';
import ProtectedRoutes from './features/auth/components/ProtectedRoutes.tsx';
import LoginPage from './features/auth/pages/LoginPage.tsx';
import SignupPage from './features/auth/pages/SignupPage.tsx';
import CheckoutPage from './features/checkout/pages/CheckoutPage.tsx';
import MenuPage from './features/menu/pages/MenuPage.tsx';
import OrderTrackingPage from './features/order-tracking/pages/OrderTrackingPage.tsx';
import OrderProcessingPage from './features/order/pages/OrderProcessingPage.tsx';
import AddCardPage from './features/payment/pages/AddCardPage.tsx';
import PaymentPage from './features/payment/pages/PaymentPage.tsx';
import RestaurantPage from './features/restaurant/pages/RestaurantPage.tsx';
import ComingSoonPage from './features/standalone/pages/ComingSoonPage.tsx';
import OrderSuccessPage from './features/standalone/pages/OrderSuccessPage.tsx';
import SearchBoxPage from './features/standalone/pages/SearchBoxPage.tsx';
import store from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RestaurantPage /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/signup', element: <SignupPage /> },
      { path: 'restaurant/:restaurantId', element: <MenuPage /> },
      { path: 'search', element: <SearchBoxPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'coming-soon', element: <ComingSoonPage /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: 'manage-address', element: <AddressPage /> },
          { path: 'manage-address/add', element: <SaveAddressPage /> },
          { path: 'payments', element: <PaymentPage /> },
          { path: 'payments/add-card', element: <AddCardPage /> },
          { path: 'order/request', element: <OrderProcessingPage /> },
          { path: 'order/success', element: <OrderSuccessPage /> },
          { path: 'order/track', element: <OrderTrackingPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

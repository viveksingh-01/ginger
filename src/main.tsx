import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import AddressPage from './features/address/pages/AddressPage.tsx';
import CheckoutPage from './features/checkout/pages/CheckoutPage.tsx';
import MenuPage from './features/menu/pages/MenuPage.tsx';
import OrderTrackingPage from './features/order-tracking/pages/OrderTrackingPage.tsx';
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
      { path: 'restaurant/:restaurantId', element: <MenuPage /> },
      { path: 'search', element: <SearchBoxPage /> },
      { path: 'manage-address', element: <AddressPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'payments', element: <PaymentPage /> },
      { path: 'payments/add-card', element: <AddCardPage /> },
      { path: 'order/success', element: <OrderSuccessPage /> },
      { path: 'order/track', element: <OrderTrackingPage /> },
      { path: 'coming-soon', element: <ComingSoonPage /> },
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

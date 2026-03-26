import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AddressPage from './components/AddressPage.tsx';
import ComingSoon from './components/ComingSoon.tsx';

import RestaurantList from './components/RestaurantList.tsx';
import RestaurantMenu from './components/RestaurantMenu.tsx';
import SearchBox from './components/SearchBox.tsx';
import './index.css';
import AddCardPage from './pages/AddCardPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import OrderSuccessPage from './pages/OrderSuccessPage.tsx';
import PaymentPage from './pages/PaymentPage.tsx';
import store from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RestaurantList /> },
      { path: 'restaurant/:restaurantId', element: <RestaurantMenu /> },
      { path: 'search', element: <SearchBox /> },
      { path: 'manage-address', element: <AddressPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'payments', element: <PaymentPage /> },
      { path: 'payments/add-card', element: <AddCardPage /> },
      { path: 'order/success', element: <OrderSuccessPage /> },
      { path: 'coming-soon', element: <ComingSoon /> },
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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Cart from './components/Cart.tsx';
import RestaurantList from './components/RestaurantList.tsx';
import RestaurantMenu from './components/RestaurantMenu.tsx';
import SearchBox from './components/SearchBox.tsx';
import './index.css';
import store from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RestaurantList /> },
      { path: 'search', element: <SearchBox /> },
      { path: 'checkout', element: <Cart /> },
      { path: 'restaurant/:restaurantId', element: <RestaurantMenu /> },
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

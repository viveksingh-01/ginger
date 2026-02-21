import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import RestaurantList from './components/RestaurantList.tsx';
import RestaurantMenu from './components/RestaurantMenu.tsx';
import SearchBox from './components/SearchBox.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <RestaurantList /> },
      { path: 'search', element: <SearchBox /> },
      { path: 'restaurant/:restaurantId', element: <RestaurantMenu /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

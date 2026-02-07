import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return;
  const { menu } = useRestaurantMenu(restaurantId || '');
  console.log(menu);

  return (
    <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Test Restaurant</h2>
      </div>
    </section>
  );
};

export default RestaurantMenu;

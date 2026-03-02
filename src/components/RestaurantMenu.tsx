import { FaCircle, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useRestaurantDetails from '../hooks/useRestaurantDetails';
import MenuItem from './MenuItem';

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return;
  const { restaurant } = useRestaurantDetails(restaurantId || '');

  return (
    <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <div className="mb-12">
          <h2 className="my-3 text-3xl font-bold text-gray-900 dark:text-white">{restaurant?.details.name}</h2>
          <div className="p-3 bg-white/70 backdrop-blur rounded-lg">
            <div className="mb-1 font-semibold flex items-center gap-1">
              <FaStar className="text-green-700" />
              {restaurant?.details.avgRatingString} ({restaurant?.details.totalRatingsString} ratings){' '}
              <FaCircle size={4} className="mx-1 text-gray-500" />
              {restaurant?.details.costForTwo}
            </div>
            <div className="mb-1 text-ginger text-sm font-semibold">{restaurant?.details.cuisines.join(', ')}</div>
            <div className="mb-1 text-sm text-gray-700 font-semibold flex items-center gap-1">
              {restaurant?.details.locality}
              <FaCircle size={4} className="mx-2 text-gray-500" />
              {restaurant?.details.sla.slaString}
            </div>
          </div>
        </div>
        <ul className="space-y-6">
          {restaurant?.menu?.map(item => (
            <MenuItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RestaurantMenu;

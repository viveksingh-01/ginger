import NoMenuFound from '@/features/standalone/components/NoMenuFound';
import { FaCircle, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type store from '../../../store/store';
import useRestaurantDetails from '../../restaurant/hooks/useRestaurantDetails';
import MenuItem from '../components/MenuItem';
import type { IMenuItem } from '../models/menu';

const MenuPage: React.FC = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const cartItemsCount = Array.from(new Map(cartItems.map(item => [item.id, item])).values()).length;

  if (!restaurantId) return;
  const { data: restaurant } = useRestaurantDetails(restaurantId || '');

  return (
    <section className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <div className="mb-6">
          <h2 className="my-3 text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {restaurant?.details?.name}
          </h2>
          <div className="p-3 bg-white/70 backdrop-blur rounded-lg">
            <div className="mb-1 font-semibold flex items-center gap-1">
              <FaStar className="text-green-700" />
              {restaurant?.details?.avgRatingString} ({restaurant?.details?.totalRatingsString} ratings){' '}
              <FaCircle size={4} className="mx-1 text-gray-500" />
              {restaurant?.details?.costForTwo}
            </div>
            <div className="mb-1 text-ginger text-sm font-semibold">{restaurant?.details?.cuisines.join(', ')}</div>
            <div className="mb-1 text-sm text-gray-700 font-semibold flex items-center gap-1">
              {restaurant?.details?.locality}
              <FaCircle size={4} className="mx-2 text-gray-500" />
              {restaurant?.details?.sla.slaString}
            </div>
          </div>
        </div>
        {restaurant?.menu.length == 0 ? (
          <NoMenuFound />
        ) : (
          <div className="mt-12">
            <ul className="space-y-6">
              {restaurant?.menu?.map((item: IMenuItem) => (
                <MenuItem item={item} key={item.id} restaurantId={restaurantId} />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full fixed bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out">
        <div
          onClick={() => navigate('/checkout')}
          className={`
            py-2 px-4 shadow-lg text-white bg-green-600 cursor-pointer transition-all duration-500 ease-out
            ${cartItemsCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
          `}
        >
          <div className="container mx-auto max-w-3xl px-6 flex justify-between">
            <span>
              {cartItemsCount} {cartItemsCount > 1 ? 'items' : 'item'} added
            </span>
            <span className="font-bold">VIEW CART</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;

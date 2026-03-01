import { FaCircle, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IMAGE_URL } from '../constants';
import useRestaurantDetails from '../hooks/useRestaurantDetails';

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
          {restaurant?.menu?.map(
            ({ id, name, description, price, finalPrice, itemPriceStrikeOff, imageId, ratings }) => (
              <>
                <li key={id} className="flex justify-between items-start">
                  <div className="pr-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
                    <p className="dark:text-gray-400 mt-1">
                      {itemPriceStrikeOff && <span className="text-gray-400 line-through">₹{price / 100}</span>} ₹
                      {finalPrice / 100}
                    </p>
                    <div className="mt-2 flex items-center gap-0.5 text-sm">
                      <FaStar className="text-green-700" />
                      <span className="font-bold text-green-700">{ratings.rating}</span>({ratings.ratingCountV2})
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{description}</p>
                  </div>
                  <div className="relative w-40 h-36 shrink-0">
                    {imageId && (
                      <img src={IMAGE_URL + imageId} alt={name} className="w-full h-full object-cover rounded-xl" />
                    )}
                    <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold px-8 py-1 rounded-lg shadow-md border border-gray-200">
                      ADD
                    </button>
                  </div>
                </li>
                <hr className="text-gray-300" />
              </>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default RestaurantMenu;

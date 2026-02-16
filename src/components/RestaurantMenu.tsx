import { FaStar } from 'react-icons/fa';
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
        <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white">Test Restaurant</h2>
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
                  {imageId && (
                    <img src={IMAGE_URL + imageId} alt={name} className="w-40 h-36 object-cover rounded-xl" />
                  )}
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

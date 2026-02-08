import { useParams } from 'react-router-dom';
import { IMAGE_URL } from '../constants';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu: React.FC = () => {
  const { restaurantId } = useParams();

  if (!restaurantId) return;
  const { menu } = useRestaurantMenu(restaurantId || '');

  return (
    <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white">Test Restaurant</h2>
        <ul className="space-y-6">
          {menu?.items.map(({ id, name, price, finalPrice, itemPriceStrikeOff, imageId }) => (
            <>
              <li key={id} className="flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
                  <p className="dark:text-gray-400 mt-1">
                    {itemPriceStrikeOff && <span className="text-gray-400 line-through">₹{price / 100}</span>} ₹
                    {finalPrice / 100}
                  </p>
                </div>
                {imageId && <img src={IMAGE_URL + imageId} alt={name} className="w-40 h-36 object-cover rounded-xl" />}
              </li>
              <hr className="text-gray-300" />
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RestaurantMenu;

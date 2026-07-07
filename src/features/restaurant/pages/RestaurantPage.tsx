import { Link } from 'react-router-dom';

import RestaurantCard from '../components/RestaurantCard';
import RestaurantListSkeleton from './RestaurantListSkeleton';

import NoRestaurants from '@/features/standalone/components/NoRestaurants';
import { useRestaurants } from '../hooks/useRestaurants';

const RestaurantPage: React.FC = () => {
  const { data: restaurants = [], isLoading, isError, error, refetch } = useRestaurants();

  if (isLoading) {
    return (
      <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Restaurants near you</h2>

          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <RestaurantListSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error((error as Error).message);
    return <NoRestaurants />;
  }

  return (
    <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Restaurants near you</h2>

        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {restaurants.map(restaurant => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantPage;

import { Link } from 'react-router-dom';

import RestaurantCard from '../components/RestaurantCard';
import RestaurantListSkeleton from './RestaurantListSkeleton';

import Button from '@/shared/components/Button';
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
    return (
      <section className="mt-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error loading restaurants</h2>
            <p className="text-red-600 dark:text-red-400">{(error as Error).message}</p>
            <div className="max-w-[320px] mx-auto">
              <Button onClickHandler={() => refetch()}>Retry</Button>
            </div>
          </div>
        </div>
      </section>
    );
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

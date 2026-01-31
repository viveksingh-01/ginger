import { useEffect, useState } from "react";
import type IRestaurant from "../models/restaurant";
import RestaurantCard from "./RestaurantCard";
import RestaurantListSkeleton from "./RestaurantListSkeleton";

const BASE_URL = import.meta.env.VITE_GINGER_API_URL;

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const getRestaurantList = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/restaurants`);
      if (!res.ok) {
        throw new Error("Failed to fetch restaurant data");
      }
      const { data } = await res.json();
      setRestaurants(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantList();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-950 min-h-screen">
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

  if (error) {
    return (
      <section className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error loading restaurants</h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={getRestaurantList}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-950 min-h-screen">
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
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;

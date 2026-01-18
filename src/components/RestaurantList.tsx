import { useEffect, useState } from "react";
import type IRestaurant from "../models/restaurant";
import RestaurantCard from "./RestaurantCard";
import RestaurantListSkeleton from "./RestaurantListSkeleton";

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const getRestaurantList = async () => {
    try {
      setLoading(true);
      const res = await fetch("/data/restaurant-list.json");
      if (!res.ok) {
        throw new Error("Failed to fetch restaurant data");
      }

      const { restaurants } = await res.json();
      setRestaurants(restaurants || []);
    } catch (err) {
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
      <section className="min-h-screen">
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

  return (
    <section className="min-h-screen">
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
            <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantList;

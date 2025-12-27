import { useEffect, useState } from "react";
import type IRestaurant from "../models/restaurant";
import RestaurantCard from "./RestaurantCard";

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        const res = await fetch("/data/restaurant-list.json");
        const { restaurants } = await res.json();
        setRestaurants(restaurants || []);
      } catch (err) {
        console.error("Error fetching restaurants", err);
      }
    };
    getRestaurantList();
  }, []);

  console.log(restaurants);

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Restaurants near you</h2>
      {/* Grid */}
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
    </section>
  );
};

export default RestaurantList;

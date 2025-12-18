import { useEffect, useState } from "react";
import type IRestaurant from "../models/restaurant";

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
      <h3>Restaurant list will appear here.</h3>
    </section>
  );
};

export default RestaurantList;

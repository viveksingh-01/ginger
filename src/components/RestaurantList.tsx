import { useEffect } from "react";

const RestaurantList: React.FC = () => {
  async function getRestaurantList() {
    const res = await fetch("/data/restaurant-list.json");
    const restaurantList = await res.json();
    console.log(restaurantList);
  }

  useEffect(() => {
    getRestaurantList();
  }, []);

  return (
    <section className="min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Restaurants near you</h2>
      <h3>Restaurant list will appear here.</h3>
    </section>
  );
};

export default RestaurantList;

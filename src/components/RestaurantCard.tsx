import { IMAGE_URL } from "../constants";
import type IRestaurant from "../models/restaurant";

const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
  return (
    <div
      className="
          group cursor-pointer
          bg-white dark:bg-gray-900
          rounded-2xl
          overflow-hidden
          transition-all duration-200 ease-out
          hover:-translate-y-[2px]
          hover:shadow-xl
        "
    >
      {/* Image */}
      <div>
        <img
          src={IMAGE_URL + restaurant.info.cloudinaryImageId}
          alt={restaurant.info.name}
          className="w-full h-44 object-cover"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{restaurant.info.name}</h3>
      </div>
    </div>
  );
};

export default RestaurantCard;
